import jwtDecode from "jwt-decode";
import { useContext } from "react";
import apiClient from "../api/client";

import AuthContext from "./context"

import authStorage from "./storage";

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext);

  const logIn = (authToken: string) => {
    const user = jwtDecode(authToken);
    
    // once get the authToken, set header to call protected apis
    if (authToken) apiClient.setHeader('x-auth-token', authToken);
    
    setUser(user);
    authStorage.storeToken(authToken);
  }
  
  const logOut = () => {
    setUser(null);
    authStorage.removeToken();
  }
  
  return { logIn, logOut, user, setUser}
}

export default useAuth;