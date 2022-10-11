import client from "./client";
const endPoint = "/business";

const getAllCities = () => client.get(endPoint + "/getAllCities");

const getReviewImages = () => client.get(endPoint + "/getReviewImages");

export default {
  getAllCities,
  getReviewImages,
};
