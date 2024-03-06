import Select from "react-select";
import {
  locations,
  BACKEND_URL,
  putRequest,
  CurrentUserContext,
} from "../lib/Constants.js";
import { controlForm, menu, option } from "../lib/ClassesName.jsx";
import { useForm, Controller } from "react-hook-form";
import { useContext } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, Link } from "react-router-dom";

export default function EditProfile() {
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { mutate } = useMutation({
    mutationFn: (formData) =>
      putRequest(`${BACKEND_URL}/users/${currentUser?.id}`, formData),
    onSuccess: () => navigate("/profile"),
  });

  const onSubmit = (formData) =>
    mutate({ ...formData, locationId: formData.locationId.value });

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <Link to="/profile">
          <button className="btn btn-primary">Back</button>
        </Link>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
