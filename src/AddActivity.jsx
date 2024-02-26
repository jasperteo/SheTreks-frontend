import Select from "react-select";
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
    
    <Select

    options={category}
    isMulti
    onChange={handleChange}/>
   
   
   
    </>
  )
}