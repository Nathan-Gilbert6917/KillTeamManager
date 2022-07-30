import React, { useRef, useEffect } from "react";

const OutsideAlerter = ({handleClick, children}) => {

  const useOutsideAlerter =(ref)=> {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          handleClick(event);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  return (<div ref={wrapperRef}>{children}</div>);
}

export default OutsideAlerter;