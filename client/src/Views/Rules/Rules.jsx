import React, { Fragment } from "react";

import Search from "../../Components/SearchBar/SearchBar";
import Button from "../../Components/Button/Button";

import "./Rules.css";
import addEntityIcon from "./plus-solid.svg";

const Rules = () => {
  let list = [
    {
      name: "Item 1",
      desc:
        "Item Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "Item Type",
    },
    {
      name: "Item 2",
      desc:
        "Item Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "Item Type",
    },
    {
      name: "Item 3",
      desc:
        "Item Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "Item Type",
    },
    {
      name: "Item 4",
      desc:
        "Item Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "Item Type",
    },
    {
      name: "Item 5",
      desc:
        "Item Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "Item Type",
    },
    {
      name: "Item 6",
      desc:
        "Item Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "Item Type",
    },
    {
      name: "Item 7",
      desc:
        "Item Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "Item Type",
    },
    {
      name: "Item 8",
      desc:
        "Item Description Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      type: "Item Type",
    },
  ];

  const listItems = list.map((item) => (
    <li>
      <span className="entity-item-header">
        <b>{item.name}</b>
        <span>
          <b>Type:</b> {item.type}
        </span>
      </span>
      <span className="entity-item-content">
        <b>Description:</b> {item.desc}
      </span>
    </li>
  ));

  return (
    <Fragment>
      <div className="entity-header">
        <span className="entity-title">
          <h1>Rules</h1>
        </span>

        <div className="search-bar-container">
          <Search></Search>
        </div>
        <div>
          <Button
            label="Create Rule"
            isCircular
            icon={addEntityIcon}
            iconAlt="plus icon"
          />
        </div>
      </div>

      <ul className="entity-list-container">{listItems}</ul>
    </Fragment>
  );
};

export default Rules;
