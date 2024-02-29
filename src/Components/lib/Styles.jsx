//MultiValue boxes for selected values
export const multiValue =
  "border border-green rounded-md bg-light-pink p-1 m-0.5";

//Form field box
export const control = "w-80 my-8 border-4 border-green rounded-md bg-white";

//Dropdown menu when dropdown is selected
export const menu = "border border-green rounded-md bg-white";

//Options in dropdown menu
export const option = "hover:bg-light-pink";

//Light grey icon in Navbar
export const lgreyIcon = "content-center text-3xl text-grey";

//Semi bold text in container
export const semiBoldTxCen = "text-center font-semibold";

//smallest  avatar
export const RoundedAvatar = ({ image }) => {
  return (
    <img className="avatar mb-2 w-8 rounded-full" src={image} alt="Avatar" />
  );
};
