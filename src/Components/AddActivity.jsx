import Select from "react-select";
import { useState } from "react";
import {
  controlForm,
  menu,
  option,
  center,
  pinkButton,
  title,
  multiValue,
} from "./lib/Styles";
import { categories, locations, groupSizes } from "./lib/Constants";
import dayjs, { Dayjs } from "dayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm, Controller } from "react-hook-form";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import supabase from "./lib/Supabase";
import { supabaseActivity } from "./lib/Supabase";

export default function AddActivity() {
  const [imageUrl, setImageUrl] = useState("");

  const tomorrow = dayjs().add(1, "day");

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const SUPABASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/activity`;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // const useGeocode = (address) => {
  //   const data = useQuery({
  //     queryKey: ["geocode", address],
  //     queryFn: async () => {
  //       const response = await axios.get(
  //         `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
  //       );
  //       return response.data;
  //     },
  //   });
  // };

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    // Upload the file to Supabase storage
    const { data, error } = await supabase.storage
      .from("activity")
      .upload("test.jpg", file);

    setImageUrl(`SUPABASE_URL/${data.path}`);

    // Check for upload error
    if (error) {
      console.error("Error uploading file:", error.message);
      return;
    }
  };

  const onSubmit = async (value) => {
    console.log(value);

    let address = value.address.split(" ").join("+");
    console.log(address);

    let lat, long;

    //Retrieve lat and long using geocoding based on address
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`,
      );
      console.log(response.data);

      // Extract latitude and longitude from the response data
      lat = response.data.results[0].geometry.location.lat;
      long = response.data.results[0].geometry.location.lng;
      console.log("data", lat, long);
    } catch (error) {
      console.error("Error fetching data:", error);
    }

    //Post new activity to backend
    try {
      const response = await axios.post(`${BACKEND_URL}/activity`, {
        hostId: 1,
        title: value.title,
        description: value.description,
        address: value.address,
        eventDate: value.activityDate.$d,
        locationId: value.locationId.value,
        categoryId: value.categoryId,
        groupSizeId: value.groupSizeId.value,
        latitude: lat,
        longitude: long,
        imageUrl: imageUrl,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="flex h-screen flex-col items-center justify-center">
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
            <Controller
              name="image"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  {...field}
                  type="file"
                  accept="image/*"
                  className="file-input file-input-bordered file-input-primary my-2 h-10 w-full max-w-xs"
                  onChange={handleFileUpload}
                />
              )}
            />
          </div>

          <button className={pinkButton}>Submit</button>
        </form>
      </div>
    </>
  );
}
