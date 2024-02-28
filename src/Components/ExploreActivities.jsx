import Select  from "react-select";
import { useState } from 'react';
import { multiValue, control, menu, option } from './lib/styles';
import { category, location, groupSizes } from './lib/constants';

export default function ExploreActivities() {

    const handleChange = (value) => {
    console.log(value);
  }

  return (
    <div>
      <h1 className="text-xl text-center font-bold text-black/50 mb-4 ">Explore Activities</h1>

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

    <div className=" rounded-full h-12 w-80 flex flex-row border-4 border-green bg-grey mt-2 mx-auto items-center max-w-[50rem]">
          <input
          placeholder ="Search keywords"
            className=" ml-4 bg-grey  rounded-md h-8 flex-1 outline-none p-4 caret-white text-center font-semibold"
            type="text"
       
          />
          {/* SUBMIT */}
          <button
            className="bg-green rounded-full h-9 w-9 mr-1">
           <svg xmlns="http://www.w3.org/2000/svg"  fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              
              className="w-6 h-6 text-white mx-auto">
              <path fill="black"
               d="m18.031 16.617l4.283 4.282l-1.415 1.415l-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9s9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617m-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.867-3.133-7-7-7s-7 3.133-7 7s3.133 7 7 7a6.977 6.977 0 0 0 4.875-1.975z"></path></svg>
            </button>
        </div>
    </div>
  );
}