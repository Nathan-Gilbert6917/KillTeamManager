import React, { Children, cloneElement } from 'react'

import './List.css';

const List = ({children}) => {

  const arrayTabs = Children.toArray(children);

  return (
    <div className="list-container">
      <ol className="list-items-container" >
        {Children.map(arrayTabs, (listItem) => {
          return (
            cloneElement(listItem, null)
          )
        })}
      </ol>
    </div>
  );
}

export default List;
