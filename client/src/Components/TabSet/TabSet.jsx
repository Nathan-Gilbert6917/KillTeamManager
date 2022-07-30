import React, { Children, useState } from 'react'
import Tab from '../Tab/Tab';

import './TabSet.css';

const TabSet = ({intitalActiveTab, children}) => {

  const arrayTabs = Children.toArray(children);
  const [ activeTab, setActiveTab ] = useState(intitalActiveTab);

  const handleTabClick = (e) => {
    setActiveTab(e.target.textContent);
  }

  return (
    <div className="tabs-container">
      <ul className="tab-set-container">
        {Children.map(arrayTabs, (tab) => {
          return (
            <Tab 
              activeTab={activeTab}
              key={tab.props.title}
              title={tab.props.title}
              onClick={(e) => handleTabClick(e)}
            />
          )
        })}
      </ul>
      <div className="tab-content">
        {Children.map(arrayTabs, (tab) => {
          if (tab.props.title !== activeTab) return undefined;
          return tab.props.children;
        })}
      </div>
    </div>
  );
}

export default TabSet;
