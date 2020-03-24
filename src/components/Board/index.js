import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import Loader from '../../widgets/Loader'
import styles from './index.scss'
import { navItems } from '../../utils/constants'

const { MODELS, VERSIONS } = navItems

const Board = (
  {
    data,
    activeSection,
    errorMessage,
    loading,
    filter,
    getData,
    setFilter,
  },
) => {
  const [options, setOptions] = useState([])
  const [selectedValue, selectOption] = useState('')
  const modelSection = activeSection === MODELS
  const versionSection = activeSection === VERSIONS
  const hasError = !!errorMessage.length
  const prevOptions = useRef()

  useEffect(() => {
    let updatedModels = []
    if (data) {
      data.forEach((item) => {
        updatedModels.push(<option key={item} className={styles.model} value={item}>{item}</option>)
      })
      setOptions(updatedModels)
      let defaultValue = selectedValue
      if (hasError) {
        defaultValue = ''
      } else if (modelSection) {
        defaultValue = filter.model || selectedValue
      } else if (versionSection) {
        defaultValue = filter.version || selectedValue
      }
      selectOption(defaultValue)
      setOptions(updatedModels)
      prevOptions.current = options
    }
  }, [data])

  const handleChange = (e) => {
    selectOption(e.target.value)
    const filterObj = {
      ...modelSection && { model: e.target.value },
      ...versionSection && { version: e.target.value },
    }
    setFilter(filterObj)
    if (e.target.value.length) {
      getData(e.target.value)
    }
  }

  const selectBoxClassName = `board_select${hasError ? '--disabled' : ''}`

  return (
    <div className={styles.board_section}>
      {loading && <Loader />}
      {!loading
        && (
          <select
            className={styles[selectBoxClassName]}
            value={selectedValue}
            onChange={handleChange}
          >
            <option
              key='default'
              className={styles.board_select_option}
              value=''
            >
              {`Select ${activeSection}`}
            </option>
              {options}
          </select>
        )}
      {hasError && !loading
        && <div className={styles.error}>{errorMessage}</div>}
    </div>
  )
}

export default Board

Board.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
  getData: PropTypes.func,
  setFilter: PropTypes.func,
  errorMessage: PropTypes.string,
  loading: PropTypes.bool,
  activeSection: PropTypes.string,
  filter: PropTypes.shape({
    model: PropTypes.string,
    version: PropTypes.string,
  }),
}

Board.defaultProps = {
  data: [],
  getData: () => {},
  setFilter: () => {},
  errorMessage: '',
  loading: true,
  activeSection: '',
  filter: {
    model: '',
    version: '',
  },
}
