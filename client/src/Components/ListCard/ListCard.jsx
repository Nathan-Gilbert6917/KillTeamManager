import React from 'react'

import './ListItem.css';

const ListItem = ({onClick, value, children}) => {

  return (
    <li className="list-item-container" value={value} onClick={(e) => onClick(e)}>
      {children}
    </li>
  )
}

export default ListItem;