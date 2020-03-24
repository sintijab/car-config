import axios from 'axios'

export const getViewportSize = () => {
  const width = window.innerWidth
  || document.documentElement.clientWidth
  || document.body.clientWidth

  if (width < 768) {
    return 'S'
  }
  if (width > 768 && width < 992) {
    return 'M'
  }
  return 'L'
}


export const paginate = (data, division, paginationIndex) => {
  const actualIndex = paginationIndex - 1
  if (actualIndex >= (data.length - division + 1)) {
    return data.slice(actualIndex * division, data.length - 1)
  }
  return data.slice(actualIndex * division, actualIndex * division + division)
}

const formatEndpoint = (endpoint) => endpoint.toString().toLowerCase().replace(/\s/g, '+')

export const requestData = async (endpoint, parameters) => {
  let params = parameters
  if (parameters) {
    const keys = Object.keys(parameters)
    keys.forEach((key) => {
      let value = params[key]
      value = formatEndpoint(value)
      params[key] = value
    })
  }
  return await axios.get(`/api${endpoint}`, { params }) // eslint-disable-line no-return-await
    .then((res) => ({ response: res.data }))
    .catch(() => ({ error: true }))
}
