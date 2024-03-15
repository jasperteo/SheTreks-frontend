import axios from "axios";
import dayjs from "dayjs";
import { DateTimeField } from "@mui/x-date-pickers/DateTimeField";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  controlForm,
  menu,
  option,
  center,
  pinkButton,
  title,
  multiValue,
} from "./lib/ClassesName";
import { BACKEND_URL, getRequest, postRequest } from "./lib/Constants";
import supabase from "./lib/Supabase";

const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

export default function AddActivity() {
  const currentUser = useOutletContext();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { data: locationsData } = useQuery({
    queryKey: ["locationsData", `${BACKEND_URL}/locations`],
    queryFn: () => getRequest(`${BACKEND_URL}/locations`),
  });
  const locations = locationsData?.map(({ id, country, city }) => ({
    value: id,
    label: `${city}, ${country}`,
  }));

  const { data: categoriesData } = useQuery({
    queryKey: ["categoriesData", `${BACKEND_URL}/activities/categories`],
    queryFn: () => getRequest(`${BACKEND_URL}/activities/categories`),
  });
  const categories = categoriesData?.map(({ id, categoryName }) => ({
    value: id,
    label: categoryName,
  }));

  const { data: groupSizesData } = useQuery({
    queryKey: ["groupSizesData", `${BACKEND_URL}/activities/groupSizes`],
    queryFn: () => getRequest(`${BACKEND_URL}/activities/groupSizes`),
  });
  const groupSizes = groupSizesData?.map(({ id, size }) => ({
    value: id,
    label: size,
  }));

  // Add activity
  const { mutate } = useMutation({
    mutationFn: (formData) =>
      postRequest(`${BACKEND_URL}/activities`, formData),
    onSuccess: (res) => navigate(`/activity/${res.data.id}`),
  });

  const onSubmit = async (formData) => {
    const { data: mapData } = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(formData.address)}&key=${GOOGLE_API_KEY}`,
    );
    const { lat, lng } = mapData.results[0].geometry.location;
    let imageData = {};
    if (formData.imageUrl[0]) {
      await supabase.storage
        .from("activity")
        .upload(formData.imageUrl[0].name, formData.imageUrl[0]);
      const { data } = supabase.storage
        .from("activity")
        .getPublicUrl(formData.imageUrl[0].name);
      imageData = data;
    }
    mutate({
      ...formData,
      hostId: currentUser.id,
      imageUrl: imageData?.publicUrl || "",
      eventDate: formData.eventDate.$d,
      selectedCategoryIds: formData.selectedCategoryIds.map((id) => id.value),
      groupSizeId: formData.groupSizeId.value,
      locationId: formData.locationId.value,
      latitude: lat,
      longitude: lng,
    });
  };

  return (
    <>
      <Link to={-1}>
        <iconify-icon class="text-3xl" icon="ri:arrow-left-s-line" />
      </Link>
      <div className="mt-3 flex flex-col items-center justify-center">
        <h1 className={title}>ADD ACTIVITY</h1>
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
                {...register("address", {
                  required: "Enter Address",
                  validate: {
                    validateAddress: async (value) => {
                      const { data: mapData } = await axios.get(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(value)}&key=${GOOGLE_API_KEY}`,
                      );
                      return mapData.results.length > 0 || "Invalid Address";
                    },
                  },
                })}
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
              <DateTimeField
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
                helperText={errors?.eventDate?.message}
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
            defaultValue={[]}
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
