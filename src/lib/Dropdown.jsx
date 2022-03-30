import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./Dropdown.css";

/**
 * 
 * @param {label} string 
 * @param {options} array 
 * @returns {JSX.Element}
 */
const Dropdown = ({ label, options, placeHolder, hoverTextColor, hoverBackground, startValue, fontFamily}) => {
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const select = useRef(null)


  const toogleSelectOption = (option) => {
    setSelected(option)
    toogleOpen()
    select.current.value=option
    eventEmitter(option)
  }



  useEffect(() => {
    const root = document.querySelector(":root")
    hoverTextColor && root.style.setProperty('--hover-color', hoverTextColor)
    hoverBackground && root.style.setProperty('--hover-background', hoverBackground)
    fontFamily && root.style.setProperty('--font-family', fontFamily)
  }, [hoverBackground, hoverTextColor, fontFamily])

  const toogleOpen = () => {
    setIsOpen(!isOpen)
  }


  const eventEmitter = (selectedElement) => {
    const event = new CustomEvent('onSelectDropdownOption', {
      detail: {
        name: label, 
        value: selectedElement
      }
    })
    document.dispatchEvent(event)
  }

  useEffect(() => {
    if(startValue){
      options.forEach(option => {
        if (option.name === startValue) {
          setSelected(option.name)
          select.current.value = option.name
          eventEmitter(option.name)
        }
      })
    }
  }, [])

  return (
    <div>
      {label && <label htmlFor={label} className="mainLabel__lib-EM">{label}</label>}
      {/* ==== Hidden select element for accessibility & semantic ==== */}
      <select name={label} id={label} className='select__lib-EM' ref={select}>
        {options.map((option, idx) => <option key={idx}>{option.name}</option>)}
      </select>
      {/* ============================================================= */}
      <div className={isOpen ? "dropdown__lib-EM open" : "dropdown__lib-EM close"}>
      {selected ? 
        <div 
          className={isOpen ? "select-label__lib-EM open" : "select-label__lib-EM close"} 
          onClick={toogleOpen} >
          <span className="placheHolder__lib-EM">{selected}</span>
          <div className="arrow__lib-EM">
            <svg  width="48px" height="48px">
              <path d="M 30,35 L 20,25 L 30,15" style={{"fill":"none", "stroke":"black"}} stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
          {/* <span ></span> */}
        </div> 
        : 
        <div 
          className={isOpen ? "select-label__lib-EM open" : "select-label__lib-EM close"} 
          onClick={toogleOpen}>
          {placeHolder ? <span className="placheHolder__lib-EM">{placeHolder}</span> : <span className="placheHolder__lib-EM"></span>}
          <div className="arrow__lib-EM">
            <svg width="48px" height="48px">
              <path d="M 30,35 L 20,25 L 30,15" style={{"fill":"none", "stroke":"black"}} stroke-width="3" stroke-linecap="round"/>
            </svg>
          </div>
        </div>}
        <ul className={isOpen ? "dropdown__deroulant__lib-EM open" : "dropdown__deroulant__lib-EM close"}>
          {options.map((option, idx) => {
            return <li 
              className={selected === option.name ? 'dropdown__option__lib-EM selected': 'dropdown__option__lib-EM'} 
              key={idx} 
              value={option.name} 
              onClick={() => toogleSelectOption(option.name)} 
              >
              <span>{option.name}</span>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}

Dropdown.defaultProps = {
  placeHolder: ""
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,

}
export default Dropdown;
