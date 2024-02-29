import Select from "react-select";
import { useState } from "react";
import { multiValue, control, menu, option, pinkButton, center } from "./lib/Styles";
import { categories, locations, groupSizes } from "./lib/Constants";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";


export default function AddActivity() {
  const [selectedValues, setSelectedValues] = useState([]);

  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <>
      <div>
        <h1 className="text-xl text-center font-bold text-black/50 mb-4 ">
          Add Activity
        </h1>
        <div className=" w-40 carousel rounded-box">
          <div className="justify-center items-center carousel-item w-full">
            <img
              src="https://d18sx48tl6nre5.cloudfront.net/webp_xl_09e8f36b243c033473b3e0a8dc574183.webp"
              className="justify-center items-center w-full"
              alt="Tailwind CSS Carousel component"
            />
          </div>
        </div>

        <div> 

        <input
          type="text"
          placeholder="Title"
          className="text-center w-80 h-12 mt-4 leading-6 border-4 border-green rounded-md bg-grey focus:outline-none"
        />
        </div>
        <div>
          <textarea
            placeholder="Description"
            cols="10"
            rows="5"
            className="text-center mt-4 w-80 border-4 border-green rounded-md bg-grey focus:outline-none"
          />
        </div>

    

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

          <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            label="Date & Time"
           
  

            sx={{
          width: "100%",
          
           backgroundColor: "#F2F3F4",
           
           
           "*": {
          fontFamily: "InterVariable !important",
        

        },
         ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
          fontFamily: "InterVariable !important",
        
        },
      }}

            
          />
        </LocalizationProvider>
      

        <div>
          <input
            type="file"
            accept="image/*"
            className="file-input my-4 h-10 file-input-bordered file-input-primary w-full max-w-xs"
          />
        </div>

        <button className={pinkButton}>Submit</button>
      </div>
    </>
  );
}
