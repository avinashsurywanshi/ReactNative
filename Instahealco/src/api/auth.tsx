import client from "./client";

const endPoint = "/user";

// client.addAsyncResponseTransform(async (request) => {
//   const authToken = await authStorage.getToken();
//   if (!authToken) return;

//   client.setHeaders({ "x-auth-token": authToken });
// })

const login = (mobile_no: number | undefined, otp: number | undefined) => client.post(endPoint + "/login", { mobile_no, otp });

const getOtp = (mobile_no: any) => client.post(endPoint + "/getOtp", mobile_no);

// const setAuthToken = (authToken: string) => {
//   client.setHeaders({ 'x-auth-token': authToken });
// }

const getUserDetails = ():any => client.get(endPoint + "/me");

export default {
  getOtp,
  getUserDetails,
  login
}