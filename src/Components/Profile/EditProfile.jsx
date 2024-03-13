import { useUser } from "@clerk/clerk-react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { controlForm, menu, option } from "../lib/ClassesName";
import { BACKEND_URL, putRequest, getRequest } from "../lib/Constants.js";

export default function EditProfile() {
  const { user } = useUser();
  const currentUser = useOutletContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutate } = useMutation({
    mutationFn: (formData) =>
      putRequest(`${BACKEND_URL}/users/${currentUser?.id}`, formData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [
          "currentUser",
          user,
          `${BACKEND_URL}/users/sync/${currentUser?.clerkUid}`,
        ],
      });
      navigate(-1);
    },
  });

  const onSubmit = (formData) =>
    mutate({ ...formData, locationId: formData.locationId.value });

  return (
    <>
      <Link to={-1}>
        <iconify-icon class="text-3xl" icon="ri:arrow-left-s-line" />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="locationId"
          control={control}
          defaultValue=""
          rules={{ required: "Location is required" }}
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
        <label className="form-control">
          <div className="label">
            <span className="label-text-s">About</span>
          </div>
          <textarea
            {...register("about", { required: "Enter About" })}
            className={`textarea ${errors.about ? "textarea-error" : "textarea-accent"} h-24 border-4 bg-grey`}
            defaultValue={currentUser?.about}
            placeholder="Your Bio"
          />
          {!!errors.about && (
            <div className="label">
              <span className="label-text-alt text-error">
                {errors?.about?.message}
              </span>
            </div>
          )}
        </label>
        <br />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
