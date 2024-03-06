import axios from "axios";
import { createContext } from "react";

const locations = [
  { value: 1, label: "Kuala Lumpur, Malaysia" },
  { value: 2, label: "Penang, Malaysia" },
  { value: 3, label: "Ho Chi Minh City, Vietnam" },
  { value: 4, label: "Hanoi, Vietnam" },
  { value: 5, label: "Singapore, Singapore" },
];

//Category for activities
const categories = [
  {
    value: 1,
    label: "Food and Culinary Experiences",
  },
  {
    value: 2,
    label: "Outdoor Adventures and Nature",
  },
  {
    value: 3,
    label: "Cultural Exploration and Heritage",
  },
  {
    value: 4,
    label: "Adventure Sports and Recreation",
  },
  { value: 5, label: "Wellness and Relaxation" },
  {
    value: 6,
    label: "Urban Exploration and City Tours",
  },
  {
    value: 7,
    label: "Photography and Sightseeing",
  },
  { value: 8, label: "Nightlife and Events" },
  {
    value: 9,
    label: "Special Interest and Niche Experiences",
  },
];

const groupSizes = [
  { value: 1, label: "2 to 3" },
  { value: 2, label: "4 to 6" },
  { value: 3, label: "6 to 8" },
  { value: 4, label: "More than 8" },
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CurrentUserContext = createContext(null);

const axiosAuth = axios.create();
const getRequest = async (url) => (await axiosAuth.get(url)).data;
const putRequest = async (url, data) => await axiosAuth.put(url, data);
const postRequest = async (url, data) => await axiosAuth.post(url, data);
const deleteRequest = async (url) => await axiosAuth.delete(url);

export {
  locations,
  categories,
  groupSizes,
  BACKEND_URL,
  CurrentUserContext,
  axiosAuth,
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
  formatDateandTime,
  truncateText,
};

//to reduce notification characters in notification page
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

//activity category, sorted based on api id
export const categoryIcon = (apiId) => {
  switch (apiId) {
    case 1:
      return "ri:restaurant-2-line"; // Food and Culinary Experiences
    case 2:
      return "ri:plant-line"; // Outdoor Adventures and Nature
    case 3:
      return "ri:ancient-gate-line"; // Cultural Exploration and Heritage
    case 4:
      return "ri:riding-line"; // Adventure Sports and Recreation
    case 5:
      return "ri:user-heart-line"; // Wellness and Relaxation
    case 6:
      return "ri:building-2-line"; // Urban Exploration and City Tours
    case 7:
      return "ri:camera-3-line"; // Photography and Sightseeing
    case 8:
      return "ri:beer-line"; // Nightlife and Events
    case 9:
      return "ri:ghost-line"; // Special Interest and Niche Experiences
    default:
      return ""; //empty string
  }
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
