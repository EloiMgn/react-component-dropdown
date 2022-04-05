import { useEffect } from "react";
import SelectDropdown from "./lib/Dropdown";



const App = () => {

    useEffect(() => {
        document.addEventListener('onSelectDropdownOption', (e)=> {
            console.log(e.detail);
        })
    })

  return (
    <div>
        <SelectDropdown label="Label" options={states}  placeholder='--- select value ---' />
    </div>
  );
}

export default App;


const states = [
  {
      "name": "option",
      "abbreviation": "AL"
  },
  {
      "name": "option",
      "abbreviation": "AK"
  },
  {
      "name": "option",
      "abbreviation": "AS"
  },
  {
      "name": "option",
      "abbreviation": "AZ"
  },
  {
      "name": "option",
      "abbreviation": "AR"
  },
  {
      "name": "option",
      "abbreviation": "CA"
  },
  {
      "name": "option",
      "abbreviation": "CO"
  },
  {
      "name": "option",
      "abbreviation": "CT"
  },
  {
      "name": "option",
      "abbreviation": "DE"
  },
  {
      "name": "option",
      "abbreviation": "DC"
  },
  {
      "name": "option",
      "abbreviation": "FM"
  },
  {
      "name": "option",
      "abbreviation": "FL"
  },
  {
      "name": "option",
      "abbreviation": "GA"
  },
  {
      "name": "option",
      "abbreviation": "GU"
  },
  {
      "name": "option",
      "abbreviation": "HI"
  },
  {
      "name": "option",
      "abbreviation": "ID"
  },
  {
      "name": "option",
      "abbreviation": "IL"
  },
  {
      "name": "option",
      "abbreviation": "WY"
  }
];