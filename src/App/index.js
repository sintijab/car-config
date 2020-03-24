import React, { useState, useEffect, useRef } from 'react'
import styles from './index.scss'
import Board from '../components/Board'
import Loader from '../widgets/Loader'
import Navigation from '../components/Navigation'
import Vehicles from '../components/Vehicles'
import { requestData } from '../utils/functions'
import {
  endpoints,
  navItems,
  textMessage,
  filters,
} from '../utils/constants'

const { EP_MAKES, EP_MODELS, EP_VEHICLES } = endpoints
const { MODELS, VERSIONS, VEHICLES } = navItems
const { ERROR, NOT_AVAILABLE } = textMessage
const { MODEL, VERSION, VEHICLE } = filters

const App = () => {
  const [models, getModels] = useState(null)
  const [versions, getVersions] = useState(null)
  const [vehicles, getVehicles] = useState(null)
  const [filter, storeFilter] = useState({ model: '', version: '' })
  const [activeSection, setActiveSection] = useState(MODELS)
  const [loading, isLoading] = useState(true)
  const [initLoading, isLoadingInit] = useState(true)
  const [errorMessage, displayError] = useState('')
  const modelsRef = useRef(models)

  const requestSectionData = (endpoint, filterState, params) => {
    requestData(endpoint, params)
      .then((data) => {
        const {
          response,
          error = null,
        } = data
        const store = {
          versions: getVersions,
          models: getModels,
          vehicles: getVehicles,
        }
        if (response && !error) {
          store[filterState](response)
          if (!response.length) {
            displayError(`${NOT_AVAILABLE} ${filterState}`)
          } else {
            displayError('')
          }
        } else if (error) {
          displayError(ERROR)
          store[filterState]([])
          storeFilter({ model: null, version: null, vehicles: null })
        }
        isLoading(false)
      })
      .catch((err) => console.log(err))
  }

  const setFilter = (obj) => {
    const nextFilterState = {
      model: obj.model || filter.model,
      version: obj.version || filter.version,
    }
    storeFilter(nextFilterState)
  }

  const getData = (parameter) => {
    if (activeSection === MODELS) {
      requestSectionData(EP_MODELS, VERSION, { make: parameter })
    } else if (activeSection === VERSIONS) {
      requestSectionData(EP_VEHICLES, VEHICLE, { make: filter.model, model: parameter })
    }
  }

  const updateSection = (value) => {
    setActiveSection(value)
  }

  useEffect(() => {
    modelsRef.current = models
    if (initLoading) {
      isLoadingInit(false)
    }
    if (!models && !errorMessage.length) {
      requestSectionData(EP_MAKES, MODEL)
    }
  })

  const isModelSection = activeSection === MODELS
  const isVersionSection = activeSection === VERSIONS
  const isDetailsSection = activeSection === VEHICLES

  return (
    <div className={styles.app}>
      {initLoading && <Loader />}
      {!initLoading
        && (
          <div className={styles.app_board}>
            <h5 className={styles[`app_board-title`]}>CAR SELECTOR</h5>
            <Navigation
              items={[MODELS, VERSIONS, VEHICLES]}
              activeSection={activeSection}
              updateSection={updateSection}
            />
            {isModelSection
              && (
                <Board
                  data={models}
                  getData={getData}
                  setFilter={setFilter}
                  filter={filter}
                  activeSection={activeSection}
                  loading={loading}
                  errorMessage={errorMessage}
                />
              )}
            {isVersionSection
              && (
                <Board
                  data={versions}
                  getData={getData}
                  setFilter={setFilter}
                  filter={filter}
                  activeSection={activeSection}
                  loading={loading}
                  errorMessage={errorMessage}
                />
              )}
            {isDetailsSection
              && (<Vehicles data={vehicles} loading={loading} errorMessage={errorMessage} />)}
          </div>
        )}
    </div>
  )
}

export default App
