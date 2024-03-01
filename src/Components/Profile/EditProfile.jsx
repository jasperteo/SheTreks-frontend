import Select from "react-select";
import { locations } from "../lib/Constants.js";
import { control, menu, option } from "../lib/Styles";

export default function EditProfile() {
  return (
    <>
      <Select
        placeholder="Location"
        options={locations}
        // onChange={handleChange}
        unstyled
        classNames={{
          control: () => control,
          menu: () => menu,
          option: () => option,
        }}
      />
      <label className="form-control">
        <div className="label">
          <span className="label-text-s">About</span>
        </div>
        <textarea
          className="textarea textarea-bordered h-24 border-4 border-green bg-grey"
          placeholder="Your Bio"
        ></textarea>
      </label>
    </>
  );
}
