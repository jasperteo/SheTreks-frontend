import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const axiosAuth = axios.create();
const getRequest = async (url) => (await axiosAuth.get(url)).data;
const putRequest = async (url, data) => await axiosAuth.put(url, data);
const postRequest = async (url, data) => await axiosAuth.post(url, data);
const deleteRequest = async (url) => await axiosAuth.delete(url);

//to reduce notification characters in notification page
const truncateText = (text, maxLength) =>
  text.length > maxLength ? text.substring(0, maxLength) + "..." : text;

//activity category, sorted based on api id
const categoryIcon = (id) => {
  const icons = {
    1: "ri:restaurant-2-line", // Food and Culinary Experiences
    2: "ri:plant-line", // Outdoor Adventures and Nature
    3: "ri:ancient-gate-line", // Cultural Exploration and Heritage
    4: "ri:riding-line", // Adventure Sports and Recreation
    5: "ri:user-heart-line", // Wellness and Relaxation
    6: "ri:building-2-line", // Urban Exploration and City Tours
    7: "ri:camera-3-line", // Photography and Sightseeing
    8: "ri:beer-line", // Nightlife and Events
    9: "ri:ghost-line", // Special Interest and Niche Experiences
  };
  return icons[id] || ""; // return the corresponding icon or an empty string if not found
};

const formatDateandTime = (dateString) => {
  const eventDate = new Date(dateString);
  const formattedDate = eventDate.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate;
};

const formatDateMaskedTime = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  // get hours, hours is in 24-hour format
  const hours = date.getHours();

  let maskedTime = "";
  switch (true) {
    case hours < 4:
      maskedTime = "Starts from the early morning";
      break;
    case hours < 12:
      maskedTime = "Starts from the morning";
      break;
    case hours < 15:
      maskedTime = "Starts from the early afternoon";
      break;
    case hours < 18:
      maskedTime = "Starts from the late afternoon";
      break;
    case hours < 21:
      maskedTime = "Starts from the evening";
      break;
    default:
      maskedTime = "Starts from the night";
  }

  return `${formattedDate}, ${maskedTime}`;
};

export {
  BACKEND_URL,
  axiosAuth,
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
  truncateText,
  categoryIcon,
  formatDateandTime,
  formatDateMaskedTime,
};
