import React from 'react'

import './Tab.css';

const Tab = ({title, activeTab, onClick}) => {

  const activeTabClassName = () => {
    let tabClassName = 'tab-container';
    if (activeTab === title) {
      tabClassName += ' tab-container-active';
    }
    return tabClassName;
  }
  

  return (
    <li className={activeTabClassName()} onClick={onClick}>
      {title}
    </li>
  )
}

export default Tab;