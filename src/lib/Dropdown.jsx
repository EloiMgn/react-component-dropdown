import React, { useState } from "react";
import PropTypes from 'prop-types';
import "./Dropdown.css";

/**
 * 
 * @param {*} param0 
 * @returns {JSX.Element}
 */
const Dropdown = ({ label, options, HoverStyle, DropdownStyle}) => {
  const [selected, setSelected] = useState(null)
  const[hover, setHover] = useState(null)

  const toogleSelect = (selected) => {
    setSelected(selected)
  }

  const toogleHover = (hoveredElt) => {
    setHover(hoveredElt)
  }

  const hoverStyle =  HoverStyle


  const dropDownStyle = DropdownStyle


  return (
    <nav>
      <ul>
        <li className="deroulant"> 
        {selected ? <div style={dropDownStyle} className='select-label'>{selected}</div> : <div className='select-label' style={dropDownStyle}>{label}</div> }
          <ul className="sous">
          {options.map((option, idx) => 
            <li className={selected===option.name? 'selected': ''} key={idx} value={option.name} onClick={e =>toogleSelect(option.name)} onMouseOver={e =>toogleHover(option.name)} style={hover === option.name ? hoverStyle : {}}>{option.name}</li>
          )}
          </ul>
        </li>
      </ul>
    </nav>
  );
}

Dropdown.defaultProps = {
  HoverStyle: {
    "background": "hsl(345deg 100% 47%)",
    "color": 'white'
  },
  DropdownStyle: {
    "background": "white",
    "color": 'black', 
    "height": '5vh',

    'border': '1px solid black'
  }
}

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  HoverStyle: PropTypes.object,
  DropdownStyle: PropTypes.object
}
export default Dropdown;
