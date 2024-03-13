import Select from "react-select";
import { locations, BACKEND_URL, putRequest } from "../lib/Constants.js";
import { controlForm, menu, option } from "../lib/ClassesName";
import { useForm, Controller } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useNavigate, Link, useOutletContext } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

export default function EditProfile() {
  const currentUser = useOutletContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { user } = useUser();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

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
        <iconify-icon icon="ri:arrow-left-s-line" />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="locationId"
          control={control}
          defaultValue={currentUser?.locationId}
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
            {...register("about")}
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
