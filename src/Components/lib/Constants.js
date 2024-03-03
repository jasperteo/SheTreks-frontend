import axios from "axios";
import { createContext } from "react";

const locations = [
  { value: "Singapore, Singapore", label: "Singapore, Singapore" },
  { value: "Hanoi, Vietnam", label: "Hanoi, Vietnam" },
  { value: "Ho Chi Minh City, Vietnam", label: "Ho Chi Minh City, Vietnam" },
  { value: "Penang, Malaysia", label: "Penang, Malaysia" },
  { value: "Kuala Lumpur, Malaysia", label: "Kuala Lumpur, Malaysia" },
];

//Category for activities
const categories = [
  {
    value: "Food and Culinary Experiences",
    label: "Food and Culinary Experiences",
  },
  {
    value: "Outdoor Adventures and Nature",
    label: "Outdoor Adventures and Nature",
  },
  {
    value: "Cultural Exploration and Heritage",
    label: "Cultural Exploration and Heritage",
  },
  {
    value: "Adventure Sports and Recreation",
    label: "Adventure Sports and Recreation",
  },
  { value: "Wellness and Relaxation", label: "Wellness and Relaxation" },
  {
    value: "Urban Exploration and City Tours",
    label: "Urban Exploration and City Tours",
  },
  {
    value: "Photography and Sightseeing",
    label: "Photography and Sightseeing",
  },
  { value: "Nightlife and Events", label: "Nightlife and Events" },
  {
    value: "Special Interest and Niche Experiences",
    label: "Special Interest and Niche Experiences",
  },
];

const groupSizes = [
  { value: "2 to 3", label: "2 to 3" },
  { value: "4 to 6", label: "4 to 6" },
  { value: "6 to 8", label: "6 to 8" },
  { value: "More than 8", label: "More than 8" },
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CurrentUserContext = createContext(null);

const getRequest = async (url) => (await axios.get(url)).data;
const putRequest = async (url, data) => await axios.put(url, data);
const postRequest = async (url, data) => await axios.post(url, data);
const deleteRequest = async (url) => await axios.delete(url);

export {
  locations,
  categories,
  groupSizes,
  BACKEND_URL,
  CurrentUserContext,
  getRequest,
  putRequest,
  postRequest,
  deleteRequest,
};
