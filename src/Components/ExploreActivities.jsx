import Select from "react-select";
import { useState } from "react";
import {
  multiValue,
  controlForm,
  menu,
  option,
  center,
  pinkButton,
  title,
} from "./lib/ClassesName.jsx";
import { categories, locations, groupSizes } from "./lib/Constants";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";

export default function ExploreActivities() {
  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <h1 className={title}>ACTIVITIES</h1>
      <div className="mx-auto my-4 flex w-80 items-center justify-center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Start Date"
            sx={{
              width: "100%",
              backgroundColor: "#F2F3F4",
              marginRight: "10px",

              "*": {
                fontFamily: "InterVariable !important",
              },
              ".css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root": {
                fontFamily: "InterVariable !important",
              },
            }}
          />
        </LocalizationProvider>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="End Date"
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
      </div>

      <div className={center}>
        <Select
          placeholder="Location"
          options={locations}
          onChange={handleChange}
          unstyled
          classNames={{
            control: () => controlForm,
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
            control: () => controlForm,
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
            control: () => controlForm,
            menu: () => menu,
            option: () => option,
          }}
        />
      </div>

      <div className={center}>
        <input
          type="text"
          placeholder="Search keywords"
          className="input input-bordered input-accent w-full max-w-xs bg-grey"
        />
      </div>
      <div className={center}>
        <button className="focus:ring-green-500 btn btn-primary mt-3 justify-center  whitespace-nowrap focus:outline-none focus:ring-2">
          Search
        </button>
      </div>
    </div>
  );
}
