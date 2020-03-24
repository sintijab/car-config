import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import styles from './index.scss'

const Navigation = ({ items, activeSection, updateSection }) => {
  const [sections, getSections] = useState([])
  const [activeItem, setActiveItem] = useState('')
  const prevItem = useRef()

  useEffect(() => {
    if (activeItem !== activeSection) {
      let titles = []
      items.forEach((title) => {
        const itemClassName = `nav_list-item${title === activeSection ? '--active' : ''}`
        titles.push(
          <div
            key={title}
            role='presentation'
            className={styles[itemClassName]}
            onClick={() => updateSection(title)}
          >
            {title}
          </div>,
        )
      })
      getSections(titles)
      setActiveItem(activeSection)
      prevItem.current = activeItem
    }
  }, [activeSection])

  return (
    <div className={styles.nav}>
      <div className={styles.nav_list}>
        {sections}
      </div>
    </div>
  )
}
export default Navigation

Navigation.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string),
  activeSection: PropTypes.string,
  updateSection: PropTypes.func,
}

Navigation.defaultProps = {
  items: [],
  activeSection: '',
  updateSection: () => {},
}
