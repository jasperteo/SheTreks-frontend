//MultiValue boxes for selected values
export const multiValue =
  "border border-green rounded-md bg-light-pink p-1 m-0.5";

//Form field box
export const control = "w-80 my-8 border-4 border-green rounded-md bg-white";

//Dropdown menu when dropdown is selected
export const menu = "border border-green rounded-md bg-white";

//Options in dropdown menu
export const option = "hover:bg-light-pink";

//avatar
export const RoundedAvatar = ({ image, size }) => {
  return (
    <div className="avatar">
      <div className={`w-${size} rounded-full`}>
        <img src={image} alt="Avatar" />
      </div>
    </div>
  );
};
