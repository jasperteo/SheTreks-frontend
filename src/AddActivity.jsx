import Select  from "react-select";
import { useState } from 'react';

export default function AddActivity() {
  const [selectedValues, setSelectedValues] = useState([])

  const category = [
    {value: "Food and Culinary Experiences", label: "Food and Culinary Experiences"},
    {value: "Outdoor Adventures and Nature", label: "Outdoor Adventures and Nature"},
    {value: "Cultural Exploration and Heritage", label: "Cultural Exploration and Heritage"},
    {value: "Adventure Sports and Recreation", label: "Adventure Sports and Recreation"},
    {value: "Wellness and Relaxation", label: "Wellness and Relaxation"},
    {value: "Urban Exploration and City Tours", label: "Urban Exploration and City Tours"},
    {value: "Photography and Sightseeing", label: "Photography and Sightseeing"},
    {value: "Nightlife and Events", label: "Nightlife and Events"},
    {value: "Special Interest and Niche Experiences", label: "Special Interest and Niche Experiences"},
  ]

  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <>
  
    <Select />
   <br /> 
 
    
    <Select
    options={category}
    placeholder="Category"
    isMulti
    onChange={handleChange}
    unstyled
    classNames={{
    control: () => "border-4 border-green rounded-md w-80",
    multiValue: () => "border border-green rounded-md bg-light-pink p-1 m-0.5",
    menu: () => "border border-green rounded-md",
    option: () => "hover:bg-light-pink",
  }}
  />
   
    </>
  )
}