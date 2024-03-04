import Select from "react-select";
import { useState, useEffect, useContext } from "react";
import {
  controlForm,
  menu,
  option,
  center,
  pinkButton,
  title,
  multiValue,
} from "./lib/ClassesName";
import { categories, locations, groupSizes } from "./lib/Constants";
import dayjs, { Dayjs } from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm, Controller } from "react-hook-form";
import { APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import supabase from "./lib/Supabase";
import { BACKEND_URL, CurrentUserContext } from "./lib/Constants";

export default function AddActivity() {
  const [imageUrl, setImageUrl] = useState("");
  const currentUser = useContext(CurrentUserContext);

  const tomorrow = dayjs().add(1, "day");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const SUPABASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/activity`;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from("activity")
      .upload(file.name, file);

    setImageUrl(`${SUPABASE_URL}/${file.name}`);

    // Check for upload error
    if (error) {
      console.error("Error uploading file:", error.message);
      return;
    }
    console.log("Uploaded file name:", imageUrl);
  };

  const onSubmit = async (value) => {
    console.log(value);
    console.log("user", currentUser.id);

    const categories = value.categoryId.map((option) => option.value);
    console.log(categories);

    const parsedCost = parseFloat(value.cost);
    console.log("cost", parsedCost, Number(parsedCost));

    //Post new activity to backend
    try {
      const response = await axios.post(`${BACKEND_URL}/activities`, {
        hostId: currentUser.id,
        title: value.title,
        cost: parsedCost,
        description: value.description,
        address: value.address,
        eventDate: value.activityDate.$d,
        locationId: value.locationId.value,
        selectedCategoryIds: categories,
        groupSizeId: value.groupSizeId.value,
        // latitude: 1.2838,
        // longitude: 103.8591,
        imageUrl: imageUrl,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="mt-3 flex h-screen flex-col items-center justify-center">
        <h1 className={title}>ADD ACTIVITY</h1>
        <div className=" carousel w-40 rounded-box">
          <div className="carousel-item w-full items-center justify-center">
            <img
              src="https://d18sx48tl6nre5.cloudfront.net/webp_xl_09e8f36b243c033473b3e0a8dc574183.webp"
              className="w-full items-center justify-center"
              alt="Tailwind CSS Carousel component"
            />
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={center}>
            <input
              {...register("title", { required: true })}
              type="text"
              placeholder="Title"
              className="input input-bordered input-accent w-full max-w-xs bg-grey"
            />
          </div>
          <div className={center}>
            <textarea
              {...register("description")}
              className="textarea textarea-accent textarea-md w-full max-w-xs bg-grey"
              placeholder="Description"
            ></textarea>
          </div>
          <div className={center}>
            <textarea
              {...register("address", { required: true })}
              className="textarea textarea-accent textarea-md w-full max-w-xs bg-grey"
              placeholder="Address"
            ></textarea>
          </div>

          <div className={center}>
            <input
              {...register("cost", { required: true })}
              type="number"
              placeholder="Cost in local currency"
              className="input input-bordered input-accent w-full max-w-xs bg-grey"
            />
          </div>

          <Controller
            name="activityDate"
            control={control}
            defaultValue={tomorrow}
            rules={{ required: "Enter Activity date and time" }}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                disablePast
                label="Activity date and time"
                defaultValue={tomorrow}
                format={"DD/MM/YYYY hh:mm a"}
                views={["year", "month", "day", "hours", "minutes"]}
                sx={{
                  width: "20rem",
                  backgroundColor: "#F2F3F4",
                  "*": {
                    fontFamily: "InterVariable !important",
                  },
                }}
              />
            )}
          />

          <Controller
            name="locationId"
            control={control}
            defaultValue=""
            rules={{ required: "Select a location" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Location"
                options={locations}
                unstyled
                classNames={{
                  control: () => controlForm,
                  menu: () => menu,
                  option: () => option,
                }}
              />
            )}
          />

          <Controller
            name="categoryId"
            control={control}
            defaultValue=""
            rules={{ required: "Select a category" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Category"
                options={categories}
                isMulti
                unstyled
                classNames={{
                  control: () => controlForm,
                  multiValue: () => multiValue,
                  menu: () => menu,
                  option: () => option,
                }}
              />
            )}
          />

          <Controller
            name="groupSizeId"
            control={control}
            defaultValue=""
            rules={{ required: "Select a group size" }}
            render={({ field }) => (
              <Select
                {...field}
                placeholder="Group size"
                options={groupSizes}
                unstyled
                classNames={{
                  control: () => controlForm,
                  menu: () => menu,
                  option: () => option,
                }}
              />
            )}
          />

          <div>
            <input
              {...register("image")}
              type="file"
              accept="image/*"
              name="image"
              className="file-input file-input-bordered file-input-primary my-2 h-10 w-full max-w-xs"
              onChange={handleFileUpload}
            />
          </div>

          <button className={pinkButton}>Submit</button>
        </form>
      </div>
    </>
  );
}
