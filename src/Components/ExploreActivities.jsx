import Select from "react-select";
import { useState } from "react";
import {
  multiValue,
  control,
  menu,
  option,
  center,
  pinkButton,
} from "./lib/Styles";
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
      <h1 className="mb-4 text-center text-xl font-bold text-black/50 ">
        Explore Activities
      </h1>
      <div className={center}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateField
            label="Start Date"
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

      <div className=" mx-auto mt-4 flex h-12 w-80 max-w-[50rem] flex-row items-center rounded-md border-4 border-green bg-grey">
        <input
          placeholder="Search keywords"
          className=" ml-4 h-8  flex-1 rounded-md bg-grey p-4 text-center font-semibold outline-none"
          type="text"
        />
      </div>
      <div className={center}>
        <button className={pinkButton}>Search</button>
      </div>
    </div>
  );
}
