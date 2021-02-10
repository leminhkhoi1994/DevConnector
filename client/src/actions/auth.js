import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_CURRENT_USER,
  CLEAR_PROFILE
} from "./types";
import { setAlert } from "./alert";
import setAuthToken from "../ultils/setAuthToken";
import jwt_decode from "jwt-decode";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get("api/users/current");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

export const register = (newUser) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/users/register", newUser, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    
    // dispatch(loadUser());

    const { token } = res.data;
    // Set token to ls
    localStorage.setItem("token", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));
  } catch (err) {
    const error = err.response.data;
    if (error) {
      // error.array.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      Object.keys(error).forEach((e) => dispatch(setAlert(error[e], "danger")));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

export const login = (userData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    const res = await axios.post("/api/users/login", userData, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    // dispatch(loadUser());

    const { token } = res.data;
    // Set token to ls
    localStorage.setItem("token", token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    // Set current user
    dispatch(setCurrentUser(decoded));

  } catch (error) {
    const err = error.response.data;
    if (err) {
      // err.array.forEach((e) => dispatch(setAlert(e.msg, "danger")));
      Object.keys(err).forEach((e) => dispatch(setAlert(err[e], "danger")));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });

  dispatch({
    type: CLEAR_PROFILE
  })
};
