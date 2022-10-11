import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";

import { AuthObject } from "../types";
import authApi from "../api/auth";
import client from "../api/client";

const key = "instahealSecureKey";

const storeToken = async (authToken: string) => {
  try {
    await SecureStore.setItemAsync(key, authToken);
  } catch (error) {
    console.log("Error storing auth token", error);
  }
};

const getToken = async () => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.log("Error getting auth token", error);
  }
};

const getUser = async ():Promise<AuthObject | null> => {
  const token = await getToken();
  // if (token) {
  //   client.setHeaders({ "x-auth-token": token });
  //   const result = await authApi.getHome();
  //   if (result) {
  //     // console.log('restroing user... ' + (JSON.stringify(result.data)));
  //     return result.data
  //   } 
  // }

  if (token) {
    client.setHeaders({ "x-auth-token": token });
  }
  return (token) ? jwtDecode(token) : null;
}

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.log("Error while remving auth token", error);
  }
};


export default { getToken, getUser, removeToken, storeToken}