import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import "./Dropdown.css";

/**
 * 
 * @param {label} string 
 * @param {options} array 
 * @returns {JSX.Element}
 */
const Dropdown = ({ label, options, HoverStyle, DropdownStyle, hoverTransition, hoverTextColor, hoverTextWeight, hoverBackground}) => {
  const [selected, setSelected] = useState(null)
  const[hover, setHover] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const select = useRef(null)


  const toogleSelect = (option) => {
    setSelected(option)
    toogleOpen()
    select.current.value=option
    eventEmitter(option)
  }

  const toogleHover = (hoveredElt) => {
    setHover(hoveredElt)
  }

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

  const hoverStyle =  () => {
    if(HoverStyle){
      return HoverStyle
    } else {
      return {
        "background": `${hoverBackground}`,
        // "box-shadow": "1px 1px 3px #9b9b9b",
        "color": `${hoverTextColor}`,
        "transition": `all ${hoverTransition}ms`,
        "font-weight": `${hoverTextWeight}`
      }
    }
  }

  const dropDownStyle = DropdownStyle

  return (
    <div>
      <label htmlFor={label}>{label}</label>
      {/* ==== Hidden select element for accessibility & semantic ==== */}
      <select name={label} id={label} className='select' ref={select}>
      {options.map((option, idx) => {
            return <option key={idx}>{option.name}</option>
          })}
      </select>
      {/* ============================================================= */}
      <div className={isOpen? "dropdown open" : "dropdown close"}>
      {selected ? 
        <div 
          style={dropDownStyle} 
          className={isOpen? "select-label open" : "select-label close"} 
          onClick={toogleOpen} >
          <span className="label">{selected}</span>
          <span className="arrow"></span>
        </div> 
        : 
        <div 
          className={isOpen? "select-label open" : "select-label close"} 
          style={dropDownStyle} 
          onClick={toogleOpen}>
          <span className="label">-- Select {label} --</span>
          <span className="arrow"></span>
        </div> }
        <ul className={isOpen? "dropdown__deroulant open" : "dropdown__deroulant close"}>
          {options.map((option, idx) => {
            return <li 
              className={selected===option.name? 'dropdown__option selected': 'dropdown__option'} 
              key={idx} 
              value={option.name} 
              onClick={e =>toogleSelect(option.name)} 
              onMouseOver={e =>toogleHover(option.name)} 
              style={hover === option.name ? hoverStyle() : {}} >
              <span>{option.name}</span>
            </li>
          })}
        </ul>
      </div>
    </div>
  );
}

Dropdown.defaultProps = {

  hoverBackground: "hsl(345deg 100% 47%)",
  hoverTextColor: 'white',
  hoverTransition: 150,
  hoverTextWeight: 600,
  DropdownStyle: {
    "background": "white",
    "color": 'black', 
    "height": '5vh',

    'border': '1px solid black'
  }
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  HoverStyle: PropTypes.object,
  DropdownStyle: PropTypes.object
}
export default Dropdown;
