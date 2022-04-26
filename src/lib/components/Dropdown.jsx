import React, { useRef, useState, useEffect } from "react";
import PropTypes from 'prop-types';
import "./Dropdown.css";

/**
 * 
 * @param {string} label
 * @param {number} options Array of options you want to add to the dropdown
 * @param {string} placeholder Placeholder if needed
 * @param {string} startValue 
 * @param {string} fontFamily native font-family as serif, Arial...
 * @param {string} hoverTextColor
 * @param {string} hoverBackground 
 * @returns {JSX.Element}
 */
const SelectDropdown = ({ label, options, placeholder, startValue, fontFamily, hoverTextColor, hoverBackground}) => {
  const [selected, setSelected] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const select = useRef(null)


  const toogleSelectOption = (option) => {
    setSelected(option)
    toogleOpen()
    select.current.value = option
    !startValue && eventEmitter(option);
  }

  useEffect(() => {
    startValue && eventEmitter(select.current.value);
  }, [selected])


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
  startValue && options.forEach(option => {
          if (option.name === startValue) {
            setSelected(option.name)
            select.current.value = option.name
          }
        })
  }, [startValue])

  return (
    <>
      {label && <label htmlFor={label} className="mainLabel__lib-EM">{label}</label>}
      {/* ==== Hidden select element for accessibility & semantic ==== */}
      <select name={label} id={`${label}-select`} className='select__lib-EM' ref={select}>
        {options.map((option, idx) => <option key={idx}>{option.name}</option>)}
      </select>
      {/* ============================================================= */}
      <div className={isOpen ? "dropdown__lib-EM open" : "dropdown__lib-EM close"}>
      {selected ? 
        <div 
          className={isOpen ? "select-label__lib-EM open" : "select-label__lib-EM close"} 
          onClick={toogleOpen} >
          <span className="placheholder__lib-EM">{selected}</span>
          <div className="arrow__lib-EM">
            <svg  width="48px" height="48px">
              <path d="M 30,35 L 20,25 L 30,15" style={{"fill":"none", "stroke":"black"}} strokeWidth="3" strokeLinecap="round"/>
            </svg>
          </div>
        </div> 
        : 
        <div 
          className={isOpen ? "select-label__lib-EM open" : "select-label__lib-EM close"} 
          onClick={toogleOpen}>
            <span className="placheholder__lib-EM">{placeholder ?? ''}</span>
          <div className="arrow__lib-EM">
            <svg width="48px" height="48px">
              <path d="M 30,35 L 20,25 L 30,15" style={{"fill":"none", "stroke":"black"}} strokeWidth="3" strokeLinecap="round"/>
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
    </>
  );
}

// SelectDropdown.defaultProps = {
//   placeHolder: ""
// }

// SelectDropdown.propTypes = {
//   label: PropTypes.string,
//   options: PropTypes.array.isRequired,
//   placeholder: PropTypes.string,
//   hoverTextColor: PropTypes.string,
//   hoverBackground: PropTypes.string,
//   startValue: PropTypes.string,
//   fontFamily: PropTypes.string
// }
export default SelectDropdown;
