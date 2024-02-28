import Select  from "react-select";
import { useState } from 'react';
import { multiValue, control, menu, option } from './Components/lib/styles';
import { category } from './Components/lib/constants';
import { location } from './Components/lib/constants';
import {DatePicker, Label} from 'react-aria-components';
import "react-datepicker/dist/react-datepicker.css";

export default function AddActivity() {
  const [selectedValues, setSelectedValues] = useState([])

  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <>
    <div>

      {/* <input type="text" placeholder="Title" className="w-80  border-4 border-green rounded-md bg-white focus:outline-none" />
      <div>
           <textarea
            placeholder="Description"
            cols="10"
            rows="10"
            className="w-80  border-4 border-green rounded-md bg-white focus:outline-none"
          
          />

      </div> */}

     <Label> Date and time</Label> 
      <DatePicker
      label="Event date"
      aria-label="Event date"
      granularity="minute"
     />
    
    

  
    <Select
    placeholder="Location" 
     options={location}
    onChange={handleChange}
    unstyled
    classNames={{
    control: () => control,
    menu: () => menu,
    option: () => option,
      }}
     />
 
    
    <Select
    placeholder="Category"
    options={category}
    isMulti
    onChange={handleChange}
    unstyled
    classNames={{
    control: () => control,
    multiValue: () => multiValue,
    menu: () => menu,
    option: () => option,
  }}
  />
   </div>
    </>
  )
}