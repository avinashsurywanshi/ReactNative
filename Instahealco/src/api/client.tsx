import { create } from "apisauce";
import authStorage from "../auth/storage";

const apiClient = create({
  // change below ip of your machine
  //baseURL: "http://192.168.1.41:3000/api/v1", // mac
  //baseURL: "http://192.168.254.16:3000/api/v1", // fis mac  
  baseURL: "http://10.0.0.105:3000/api/v1", // fis mac  
});


export default apiClient;
