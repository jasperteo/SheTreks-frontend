import Select  from "react-select";
import { useState } from 'react';
import { multiValue, control, menu, option, center } from './lib/Styles';
import { categories, locations, groupSizes } from './lib/Constants';

export default function ExploreActivities() {

    const handleChange = (value) => {
    console.log(value);
  }

  return (
    <div>
      <h1 className="text-xl text-center font-bold text-black/50 mb-4 ">Explore Activities</h1>

      <div className={center}>
    
    <Select
    placeholder="Location" 
     options={locations}
    onChange={handleChange}
    unstyled
    classNames={{
    control: () => control,
    menu: () => menu,
    option: () => option,
      }}
     />
      </div>
 
    <div className={center}>
    <Select
    placeholder="Category"
    options={categories}
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
<div className={center}>
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

    <div className=" rounded-full mt-4 h-12 w-80 flex flex-row border-4 border-green bg-grey mx-auto items-center max-w-[50rem]">
          <input
          placeholder ="Search keywords"
            className=" ml-4 bg-grey  rounded-full h-8 flex-1 outline-none p-4 text-center font-semibold"
            type="text"
       
          />
      

        </div>
        <div className={center}>

       
            <button className="flex items-center justify-center  mt-4 bg-light-pink text-black rounded-full h-10 px-4 focus:outline-none focus:ring-2 focus:ring-green-500">
      <span className="mr-2">Search</span>
    
     
    </button>
     </div>
    </div>
  );
}