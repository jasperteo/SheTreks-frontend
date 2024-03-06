import Select from "react-select";
import { useContext } from "react";
import {
  multiValue,
  controlForm,
  menu,
  option,
  title,
  exploreCenter,
} from "./lib/ClassesName";
import { categories, locations, groupSizes } from "./lib/Constants";
import dayjs from "dayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import ActivityCard from "./UiComponents/ActivityCard.jsx";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  BACKEND_URL,
  getRequest,
  CurrentUserContext,
  postRequest,
} from "./lib/Constants.js";
import { useForm, Controller } from "react-hook-form";

export default function ExploreActivities() {
  const currentUser = useContext(CurrentUserContext);
  const queryClient = useQueryClient();

  const { data: activitiesExcludeHost } = useQuery({
    queryKey: [
      "activitiesExcludeHost",
      `${BACKEND_URL}/activities/excludeHost/${currentUser?.id}`,
    ],
    queryFn: () =>
      getRequest(`${BACKEND_URL}/activities/excludeHost/${currentUser?.id}`),
    enabled: !!currentUser,
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (formData) =>
      postRequest(`${BACKEND_URL}/activities/search`, formData),
    onSuccess: (res) => {
      queryClient.setQueryData(
        [
          "activitiesExcludeHost",
          `${BACKEND_URL}/activities/excludeHost/${currentUser?.id}`,
        ],
        res.data,
      );
    },
  });

  const onSubmit = (formData) => {
    mutate({
      ...formData,
      currentUserId: currentUser.id,
      startDate: formData.startDate?.$d || "",
      endDate: formData.endDate?.$d || "",
      groupSizeId: formData.groupSizeId?.value || "",
      locationId: formData.locationId?.value || "",
      selectedCategoryIds:
        formData.selectedCategoryIds &&
        formData.selectedCategoryIds.map((id) => id.value),
    });
    console.log({
      ...formData,
      currentUserId: currentUser.id,
      startDate: formData.startDate?.$d || "",
      endDate: formData.endDate?.$d || "",
      groupSizeId: formData.groupSizeId?.value || "",
      locationId: formData.locationId?.value || "",
      selectedCategoryIds:
        formData.selectedCategoryIds &&
        formData.selectedCategoryIds.map((id) => id.value),
    });
  };

  /*show organizer, hide Attendee section (acc) */

  return (
    <>
      <h1 className={title}>EXPLORE ACTIVITIES</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mx-auto my-4 flex w-80 items-center justify-center">
          <Controller
            name="startDate"
            control={control}
            defaultValue={dayjs().add(1, "day")}
            render={({ field }) => (
              <DateField
                {...field}
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
                label="Start Date"
                disablePast
                format="DD/MM/YYYY"
                error={!!errors.startDate}
                helperText={errors?.startDate?.message}
              />
            )}
          />

          <Controller
            name="endDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <DateField
                {...field}
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
                label="End Date"
                disablePast
                format="DD/MM/YYYY"
                error={!!errors.endDate}
                helperText={errors?.endDate?.message}
              />
            )}
          />
        </div>

        <div className={exploreCenter}>
          <Controller
            name="locationId"
            control={control}
            defaultValue=""
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
        </div>
        <div className={exploreCenter}>
          <Controller
            name="selectedCategoryIds"
            control={control}
            defaultValue={[]}
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
        </div>
        <div className={exploreCenter}>
          <Controller
            name="groupSizeId"
            control={control}
            defaultValue=""
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
        </div>
        <div className={exploreCenter}>
          <input
            {...register("searchTerm")}
            type="text"
            placeholder="Search keywords"
            className="input input-bordered input-accent w-full max-w-xs bg-grey"
          />
        </div>
        <div className={exploreCenter}>
          <button
            type="submit"
            className="focus:ring-green-500 btn btn-primary mt-3 justify-center  whitespace-nowrap focus:outline-none focus:ring-2"
          >
            Search
          </button>
        </div>
      </form>

      <div className="-mb-2 font-semibold">RESULTS:</div>

      {activitiesExcludeHost?.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </>
  );
}
