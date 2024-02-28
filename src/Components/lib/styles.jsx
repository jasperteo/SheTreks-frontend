//MultiValue boxes for selected values
export const multiValue =
  "border border-green rounded-md bg-light-pink p-1 m-0.5";

//Form field box
export const control = "min-h-12 w-80 mt-4 border-4 border-green rounded-full bg-grey";

//Dropdown menu when dropdown is selected
export const menu = "border border-green rounded-full bg-grey ";

//Options in dropdown menu
export const option = "hover:bg-light-pink";

//Center elements
export const center = "flex justify-center items-center";

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
