//MultiValue boxes for selected values
export const multiValue =
  "border border-green rounded-md bg-light-pink p-1 m-0.5";

//Form field box
export const control =
  "min-h-12 w-80 mt-4 border-4 border-green rounded-full bg-grey";

//Dropdown menu when dropdown is selected
export const menu = "border border-green rounded-full bg-grey ";

//Options in dropdown menu
export const option = "hover:bg-light-pink";

//Center elements
export const center = "flex justify-center items-center";

//Button background light pink
export const pinkButton =
  "btn btn-primary mb-10 focus:outline-none focus:ring-2 focus:ring-green-500";

export const darkPinkButton =
  "btn btn-secondary mb-10 focus:outline-none focus:ring-2 focus:ring-green-500";

export const brGreenButton =
  "btn btn-success mb-10 focus:outline-none focus:ring-2 focus:ring-green-500";

//Button background grey
export const greyButton =
  "btn btn-grey mb-10 focus:outline-none focus:ring-2 focus:ring-green-500";

//Light grey icon in Navbar
export const lgreyIcon = "content-center text-3xl text-grey";

//Dark pink icon for activity
export const dPinkIcon = "content-center text-3xl text-secondary";

//Semi bold text in container
export const semiBoldTxCen = "text-center font-semibold";

//smallest  avatar
export const RoundedAvatar = ({ image }) => {
  return (
    <img className="avatar mb-2 w-8 rounded-full" src={image} alt="Avatar" />
  );
};
