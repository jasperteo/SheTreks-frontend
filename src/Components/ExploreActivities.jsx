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
} from "./lib/ClassesName";
import { categories, locations, groupSizes } from "./lib/Constants";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import ActivityCard from "./UiComponents/ActivityCard.jsx";

export default function ExploreActivities() {
  const handleChange = (value) => {
    console.log(value);
  };

  return (
    <div>
      <h1 className={title}>EXPLORE ACTIVITIES</h1>
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
      <div className="-mb-2 font-semibold">RESULTS:</div>
      <ActivityCard
        accOwnerImage="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        accOwnerUserName="Fiona"
        accOwnerStatus="(Attendee)"
        city="Hanoi"
        country="Vietnam"
        activityTitle="Fly Fly"
        date="23 Jan 2023"
        time="08:00AM"
        activityDescription="Feel like a garbage bag!"
        organiserImageURL="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
        organiserFirstName="Tay Tay"
        organiserUsername="swiftieeee"
        activityImageURL="https://daisyui.com/images/stock/photo-1494232410401-ad00d5433cfa.jpg"
        categoryApiId={1}
        catergoryName="Fooddd"
      />
    </div>
  );
}
