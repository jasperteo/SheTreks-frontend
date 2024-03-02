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
} from "./lib/Styles";
import { categories, locations, groupSizes } from "./lib/Constants";
import dayjs, { Dayjs } from "dayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm, Controller } from "react-hook-form";

export default function AddActivity() {
  const [selectedValues, setSelectedValues] = useState([]);
  const tomorrow = dayjs().add(1, "day");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const handleChange = (value) => {
    console.log(value);
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
        <form
          onSubmit={handleSubmit((data) => {
            console.log(data);
          })}
        >
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
              <DateTimeField
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
            name="groupSizes"
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
