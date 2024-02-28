import Select  from "react-select";
import { useState } from 'react';
import { multiValue, control, menu, option } from './Components/lib/styles';
import { category } from './Components/lib/constants';
import { location } from './Components/lib/constants';
import { groupSizes } from './Components/lib/constants';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';


export default function AddActivity() {
  const [selectedValues, setSelectedValues] = useState([])


  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <>
    <div>
        <h2 className="text-xl text-center font-bold text-black/50 mb-4 ">
            Add Activity
          </h2>
         <div className="w-64 carousel rounded-box">
  <div className="carousel-item w-full">
    <img src="https://d18sx48tl6nre5.cloudfront.net/webp_xl_09e8f36b243c033473b3e0a8dc574183.webp" className="w-full" alt="Tailwind CSS Carousel component" />
  </div> 
  </div>

      <input type="text" placeholder="Title" className="text-center my-4 w-80 h-12 leading-6 border-4 border-green rounded-md bg-grey focus:outline-none" />
      <div>
           <textarea
            placeholder="Description"
            cols="10"
            rows="5"
            className="text-center w-80 my-4 border-4 border-green rounded-md bg-grey focus:outline-none"
          />

      </div>

    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimeField
        label="Date & Time"
        className=" text-center w-80 my-4 border-4 border-green rounded-md bg-grey font-sans"
        // sx={{ width: 300,
        // backgroundColor: "bg-grey",}}

       // value={value}
       // onChange={(newValue) => setValue(newValue)}
      />
    </LocalizationProvider>
 
 <div className="flex justify-center items-center">
    
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
      </div>
 
    <div className="flex justify-center items-center">
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
<div className="flex justify-center items-center">
  <Select
    placeholder="Group size" 
    options={groupSizes}
    onChange={handleChange}
    unstyled
    classNames={{
    control: () => control,
    menu: () => menu,
    option: () => option,
      }}
     />
    </div>
     

     <div>
        <input type="file" 
        accept="image/*"
        className="file-input my-4 h-10 file-input-bordered file-input-primary w-full max-w-xs" />

      </div>

  <button className="btn bg-light-pink">Submit</button>

   </div>
    </>
  )
}