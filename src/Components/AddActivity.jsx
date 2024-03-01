import Select from "react-select";
import { useState } from "react";
import {
  multiValue,
  control,
  menu,
  option,
  center,
  pinkButton,
  title,
} from "./lib/Styles";
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
        <h1 className={title}>Add Activity</h1>
        <div className=" carousel w-40 rounded-box">
          <div className="carousel-item w-full items-center justify-center">
            <img
              src="https://d18sx48tl6nre5.cloudfront.net/webp_xl_09e8f36b243c033473b3e0a8dc574183.webp"
              className="w-full items-center justify-center"
              alt="Tailwind CSS Carousel component"
            />
          </div>
        </div>

        <div className={center}>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered input-accent w-full max-w-xs bg-grey"
          />
        </div>
        <div className={center}>
          <textarea
            className="textarea textarea-accent textarea-md w-full max-w-xs bg-grey"
            placeholder="Description"
          ></textarea>
        </div>
        <div className={center}>
          <textarea
            className="textarea textarea-accent textarea-md w-full max-w-xs bg-grey"
            placeholder="Address"
          ></textarea>
        </div>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimeField
            label="Date & Time"
            sx={{
              width: "20rem",
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

        <div>
          <input
            type="file"
            accept="image/*"
            className="file-input file-input-bordered file-input-primary my-2 h-10 w-full max-w-xs"
          />
        </div>

        <button className={pinkButton}>Submit</button>
      </div>
    </>
  );
}
