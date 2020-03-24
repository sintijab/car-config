const http = require('http');
const url = require('url');
const fs = require('fs');
const htmlBundlePath = './build/index.html';
const jsBundlePath = './build/main.js';
const cssBundlePath = './build/main.css';
const swPath = './build/sw.js';

class HttpError extends Error {
  constructor(code, message = 'Uh oh, something went wrong.') {
    super(`${message} HTTP code ${code}`);
    this.code = code;
  }
}

const port = 8080;

const makes = require('./makes.json');
const models = require('./models.json');
const vehicles = require('./vehicles.json');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Request-Method', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
  res.setHeader('Access-Control-Allow-Headers', '*');

  // all cors okay.
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  handleRequest(req, res);
})

async function handleRequest(req, res) {
  const urlParts = url.parse(req.url);
  try {
    let jsPaths = []
    let assets = []
    fs.readdirSync('./build/fonts').forEach(path => {
      assets.push(`/fonts/${path}`);
    });
    fs.readdirSync('./build').forEach(path => {
      if (path.indexOf('js') !== -1) {
        jsPaths.push(`/${path}`);
      }
    });
    if (urlParts.pathname === '/' || urlParts.pathname === '' || urlParts.pathname === '/index.html') {
      // resolve entry point
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.write(fs.readFileSync('./build/index.html'));
      res.end();
    } else if (jsPaths.indexOf(urlParts.pathname) !== -1) {
      // resolve JS paths
      const jsBundlePath = `./build${urlParts.pathname}`;
      // set headers for SW
      var contentType = "text/javascript; charset=utf-8";
      if (urlParts.pathname === '/sw.js') {
        contentType = "application/x-javascript";
      }
      res.writeHead(200, { "Content-Type": contentType });
      res.write(fs.readFileSync(jsBundlePath));
      res.end();
    //
  } else if (assets.indexOf(urlParts.pathname) !== -1) {
    const assetsPath = `./build${urlParts.pathname}`;
    var contentType = "application/octet-stream; charset=utf-8";
    res.writeHead(200, { "Content-Type": contentType });
    res.write(fs.readFileSync(assetsPath));
    res.end();
  } else {
      switch (urlParts.pathname) {
        case '/main.css':
          res.writeHead(200, { "Content-Type": "text/css" });
          res.write(fs.readFileSync('./build/main.css'));
          res.end();
          break;
        case '/api/makes':
          handleGet(req, res, makes);
          break;
        case '/api/models':
          handleGet(req, res, models, ['make']);
          break;
        case '/api/vehicles':
          handleGet(req, res, vehicles, ['make', 'model']);
          break;
        default:
          throw new HttpError(404);
      }
    }
  } catch (ex) {
    console.error(ex);

    res.writeHead(ex.code || 500);
    res.write(ex.message);
    res.end();
  }
}

function handleGet(req, res, data, filters) {
  if (req.method !== 'GET') {
    throw new HttpError(405);
  }

  const random = Math.random();
  if (random >= 0.8) {
    throw new HttpError(503);
  }

  let filteredData = data;
  if (filters) {
    filteredData = filterData(req, data, filters);

    if(data === models) {
      filteredData = filteredData.map(({make, model}) => model);
    }
  }

  res.writeHead(200, { "Content-Type": "text/json" });
  res.write(JSON.stringify(filteredData, 0, 2));
  res.end();
}

function filterData(req, data, properties) {
  const urlParts = url.parse(req.url, true);

  if (!properties.every(property => urlParts.query[property])) {
    throw new HttpError(422, `You must specify the following parameters: ${properties.join(', ')}.`);
  }

  return data.filter(item =>
    properties.every(property => {
      const regx = new RegExp(urlParts.query[property], 'i');
      return item[property].search(regx) >= 0;
    })
  );
}

server.listen(port, function () {
  console.log("Server listening on: http://localhost:%s", port);
});
