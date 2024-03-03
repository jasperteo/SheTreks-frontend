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
