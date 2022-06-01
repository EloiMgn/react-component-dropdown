"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./Dropdown.css");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
var Dropdown = function Dropdown(_ref) {
  var label = _ref.label,
      options = _ref.options,
      placeholder = _ref.placeholder,
      startValue = _ref.startValue,
      fontFamily = _ref.fontFamily,
      hoverTextColor = _ref.hoverTextColor,
      hoverBackground = _ref.hoverBackground;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      selected = _useState2[0],
      setSelected = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isOpen = _useState4[0],
      setIsOpen = _useState4[1];

  var select = (0, _react.useRef)(null);

  var toogleSelectOption = function toogleSelectOption(option) {
    setSelected(option);
    toogleOpen();
    select.current.value = option;
    !startValue && eventEmitter(option);
  };

  (0, _react.useEffect)(function () {
    startValue && eventEmitter(select.current.value);
  }, [selected]);
  (0, _react.useEffect)(function () {
    var root = document.querySelector(":root");
    hoverTextColor && root.style.setProperty('--hover-color', hoverTextColor);
    hoverBackground && root.style.setProperty('--hover-background', hoverBackground);
    fontFamily && root.style.setProperty('--font-family', fontFamily);
  }, [hoverBackground, hoverTextColor, fontFamily]);

  var toogleOpen = function toogleOpen() {
    setIsOpen(!isOpen);
  };

  var eventEmitter = function eventEmitter(selectedElement) {
    var event = new CustomEvent('onSelectDropdownOption', {
      detail: {
        name: label,
        value: selectedElement
      }
    });
    document.dispatchEvent(event);
  };

  (0, _react.useEffect)(function () {
    startValue && options.forEach(function (option) {
      if (option.name === startValue) {
        setSelected(option.name);
        select.current.value = option.name;
      }
    });
  }, [startValue]);
  return /*#__PURE__*/_react["default"].createElement("div", null, label && /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: label,
    className: "mainLabel__lib-EM"
  }, label), /*#__PURE__*/_react["default"].createElement("select", {
    name: label,
    id: "".concat(label, "-select"),
    className: "select__lib-EM",
    ref: select
  }, options.map(function (option, idx) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: idx
    }, option.name);
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: isOpen ? "dropdown__lib-EM open" : "dropdown__lib-EM close"
  }, selected ? /*#__PURE__*/_react["default"].createElement("div", {
    className: isOpen ? "select-label__lib-EM open" : "select-label__lib-EM close",
    onClick: toogleOpen
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "placheholder__lib-EM"
  }, selected), /*#__PURE__*/_react["default"].createElement("div", {
    className: "arrow__lib-EM"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "48px",
    height: "48px"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 30,35 L 20,25 L 30,15",
    style: {
      "fill": "none",
      "stroke": "black"
    },
    strokeWidth: "3",
    strokeLinecap: "round"
  })))) : /*#__PURE__*/_react["default"].createElement("div", {
    className: isOpen ? "select-label__lib-EM open" : "select-label__lib-EM close",
    onClick: toogleOpen
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "placheholder__lib-EM"
  }, placeholder && placeholder), /*#__PURE__*/_react["default"].createElement("div", {
    className: "arrow__lib-EM"
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: "48px",
    height: "48px"
  }, /*#__PURE__*/_react["default"].createElement("path", {
    d: "M 30,35 L 20,25 L 30,15",
    style: {
      "fill": "none",
      "stroke": "black"
    },
    strokeWidth: "3",
    strokeLinecap: "round"
  })))), /*#__PURE__*/_react["default"].createElement("ul", {
    className: isOpen ? "dropdown__deroulant__lib-EM open" : "dropdown__deroulant__lib-EM close"
  }, options.map(function (option, idx) {
    return /*#__PURE__*/_react["default"].createElement("li", {
      className: selected === option.name ? 'dropdown__option__lib-EM selected' : 'dropdown__option__lib-EM',
      key: idx,
      value: option.name,
      onClick: function onClick() {
        return toogleSelectOption(option.name);
      }
    }, /*#__PURE__*/_react["default"].createElement("span", null, option.name));
  }))));
}; // SelectDropdown.defaultProps = {
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


var _default = Dropdown;
exports["default"] = _default;