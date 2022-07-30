import React from 'react'

import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './Accordion.css';

const Accordion = ({title, isActive, onClick, children}) => {

  let activeContentClassName = isActive ? '' : ' hide';

  return (
    <div className="accordion-tab-container" >
      <div className="accordion-title-bar" onClick={onClick}>  
        <span className="accordion-title">{title}</span>
        <span className="accordion-title-right">
          {isActive ?
            <FontAwesomeIcon className="accordion-chevron" icon={solid('chevron-up')} />
            :
            <FontAwesomeIcon className="accordion-chevron" icon={solid('chevron-down')} />
          }    
        </span>
      </div>
      <div className={`accordion-content ${activeContentClassName}`}>
          {children}
      </div>
    </div>
  )
}

export default Accordion;