import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../widgets/Loader'
import styles from './index.scss'
import { paginate } from '../../utils/functions'
import { PAGINATION_AMOUNT } from '../../utils/constants'

const Vehicles = ({ data, errorMessage, loading }) => {
  const [versions, getVersions] = useState([])
  const [pageNav, getPageNav] = useState([])
  const [pagesNr, setNumberOfPages] = useState([])
  const [paginationIndex, nextPage] = useState(1)
  const division = PAGINATION_AMOUNT
  const prevIndex = useRef()

  useEffect(() => {
    // detect switch between navigation items
    const shouldUpdatePage = !!prevIndex.current && prevIndex.current !== paginationIndex
    if ((!versions.length || shouldUpdatePage) && data && data.length) {
      let engines = []
      // pagination of all items for performance
      const page = paginate(data, division, paginationIndex)
      page.forEach((engine, i) => {
        const key = `${i}${engine.enginePowerPS}`
        const details = (
          <ul key={key} className={styles.list}>
            <li>
              <b>Model: </b>
              <span>{engine.make}</span>
            </li>
            <li>
              <b>Version: </b>
              <span>{engine.model}</span>
            </li>
            <li>
              <b>Horsepower: </b>
              <span>{engine.enginePowerPS}</span>
            </li>
            <li>
              <b>Engine Power (kW): </b>
              <span>{engine.enginePowerKW}</span>
            </li>
            <li>
              <b>Engine: </b>
              <span>{engine.fuelType}</span>
            </li>
            <li>
              <b>Type: </b>
              <span>{engine.bodyType}</span>
            </li>
            <li>
              <b>Capacity: </b>
              <span>{engine.engineCapacity}</span>
            </li>
          </ul>
        )
        engines.push(details)
      })
      getVersions(engines)
      // set navigation of Versions page
      const numberOfPages = data.length % division === 0
        ? data.length / division : Math.floor(data.length / division) + 1
      setNumberOfPages(numberOfPages)
      let pageNavigation = []
      for (let i = 1; i <= numberOfPages; i += 1) {
        let pageNr = i
        pageNavigation.push(
          <span
            role='presentation'
            className={styles[`pagination${i === paginationIndex ? '--active' : '--regular'}`]}
            onClick={() => nextPage(pageNr)}
          >
            {pageNr}
          </span>,
        )
      }
      getPageNav(pageNavigation)
    }
    prevIndex.current = paginationIndex
  }, [paginationIndex])

  const hasError = !!errorMessage.length
  const isLastPage = pagesNr === paginationIndex
  const isFirstPage = paginationIndex === 1
  const shouldDisplayNav = !loading && !hasError && !!versions.length
  return (
    <div>
      {loading && <Loader />}
      {!loading && !hasError && versions}
      {shouldDisplayNav && pageNav}
      {shouldDisplayNav
        && (
          <div className={styles.pagination}>
            {!isFirstPage
              && (
                <span
                  role='presentation'
                  className={styles.pagination_link}
                  onClick={() => nextPage(paginationIndex - 1)}
                >
                  {` < Prev`}
                </span>
              )}
            {!isLastPage
              && (
                <span
                  role='presentation'
                  className={styles.pagination_link}
                  onClick={() => nextPage(paginationIndex + 1)}
                >
                  {`Next >`}
                </span>
              )}
          </div>
        )}
      {!loading && hasError && <div className={styles.error}>{errorMessage}</div>}
    </div>
  )
}

export default Vehicles


Vehicles.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape(
    {
      make: PropTypes.string,
      model: PropTypes.string,
      enginePowerPS: PropTypes.number,
      enginePowerKW: PropTypes.number,
      fuelType: PropTypes.string,
      bodyType: PropTypes.string,
      engineCapacity: PropTypes.number,
    },
  )),
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
}

Vehicles.defaultProps = {
  data: [{
    make: '',
    model: '',
    enginePowerPS: '',
    enginePowerKW: '',
    fuelType: '',
    bodyType: '',
    engineCapacity: '',
  }],
  errorMessage: '',
  loading: true,
}
