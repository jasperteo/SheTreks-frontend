import Select from "react-select";
import { useContext } from "react";
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
import dayjs from "dayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useForm, Controller } from "react-hook-form";
import { APIProvider, useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { useQuery, useMutation } from "@tanstack/react-query";
import supabase from "./lib/Supabase";
import {
  BACKEND_URL,
  CurrentUserContext,
  getRequest,
  postRequest,
} from "./lib/Constants";

export default function AddActivity() {
  const currentUser = useContext(CurrentUserContext);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (formData) =>
      postRequest(`${BACKEND_URL}/activities`, formData),
  }); // on success navigate to newly created activity page?

  const onSubmit = async (formData) => {
    await supabase.storage
      .from("activity")
      .upload(formData.imageUrl[0].name, formData.imageUrl[0]);
    const { data } = supabase.storage
      .from("activity")
      .getPublicUrl(formData.imageUrl[0].name);
    mutate({
      ...formData,
      hostId: currentUser.id,
      imageUrl: data.publicUrl,
      eventDate: formData.eventDate.$d,
      selectedCategoryIds: formData.selectedCategoryIds.map((id) => id.value),
      groupSizeId: formData.groupSizeId.value,
      locationId: formData.locationId.value,
    });
  };

  return (
    <>
      <div className="mt-3 flex flex-col items-center justify-center">
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
            <label className="form-control w-full max-w-xs">
              <input
                {...register("title", { required: "Enter Title" })}
                className={`input ${errors.title ? "input-error" : "input-accent"} w-full max-w-xs bg-grey`}
                type="text"
                placeholder="Title"
              />
              {!!errors.title && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.title?.message}
                  </span>
                </div>
              )}
            </label>
          </div>

          <div className={center}>
            <label className="form-control w-full max-w-xs">
              <textarea
                {...register("description", { required: "Enter Description" })}
                className={`textarea ${errors.description ? "textarea-error" : "textarea-accent"} textarea-md w-full max-w-xs bg-grey`}
                placeholder="Description"
              />
              {!!errors.description && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.description?.message}
                  </span>
                </div>
              )}
            </label>
          </div>

          <div className={center}>
            <label className="form-control w-full max-w-xs">
              <textarea
                {...register("address", { required: "Enter Address" })}
                className={`textarea ${errors.address ? "textarea-error" : "textarea-accent"} textarea-md w-full max-w-xs bg-grey`}
                placeholder="Address"
              />
              {!!errors.address && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.address?.message}
                  </span>
                </div>
              )}
            </label>
          </div>

          <div className={center}>
            <label className="form-control w-full max-w-xs">
              <input
                {...register("cost", {
                  required: "Enter cost",
                  pattern: { value: /^[0-9]*$/, message: "Enter integer" },
                })}
                type="text"
                placeholder="Cost in local currency"
                className={`input ${errors.cost ? "input-error" : "input-accent"} w-full max-w-xs bg-grey`}
              />
              {!!errors.cost && (
                <div className="label">
                  <span className="label-text-alt text-error">
                    {errors?.cost?.message}
                  </span>
                </div>
              )}
            </label>
          </div>

          <Controller
            name="eventDate"
            control={control}
            defaultValue={dayjs().add(1, "day")}
            rules={{ required: "Enter Activity date and time" }}
            render={({ field }) => (
              <DateTimePicker
                {...field}
                sx={{
                  width: "20rem",
                  backgroundColor: "#F2F3F4",
                  "*": {
                    fontFamily: "InterVariable !important",
                  },
                }}
                disablePast
                label="Activity date and time"
                format="DD/MM/YYYY hh:mm a"
                error={!!errors.eventDate}
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
            name="selectedCategoryIds"
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

          <input
            {...register("imageUrl")}
            type="file"
            accept="image/*, image/avif"
            className="file-input file-input-bordered file-input-primary my-2 h-10 w-full max-w-xs"
          />

          <button type="submit" className={pinkButton}>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
