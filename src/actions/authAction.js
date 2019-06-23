import {
  LOGIN,
  LOGOUT,
  REGISTER,
  SET_AUTH,
  LOAD_USER,
  GET_AUTH
} from "./types";
import { notifyUser } from "./notifyActions";
import axios from "axios";
import querystring from "querystring";

let ip;

localStorage.getItem("morc_ip")
  ? (ip = localStorage.getItem("morc_ip"))
  : (ip = "localhost");

export const login = (uName, password) => async dispatch => {
  console.log("%c LOGIN", "color: orange; font-weight: bold");
  console.log(`Username: ${uName} & Password: ${password}`);

  let response;

  try {
    response = await axios.post(
      `http://${ip}:8094/account/login`,
      querystring.stringify({ uName: uName, password: password }),
      { "Content-Type": "application/x-www-form-urlencoded" }
    );
  } catch (error) {
    dispatch(
      notifyUser(
        "Request failed. Please try again at a later time.",
        "danger",
        "500 Server error"
      )
    );
    return;
  }

  let token = JSON.parse(response.data.content).session;

  console.log("%c AUTH", "color: orange; font-weight: bold");
  console.log(`Content: ${response.data.content}`);
  console.log(`Token: ${token}`);

  // Save JSWToken to localStorage
  localStorage.setItem("token", token);

  if (response.data.type === "LOGIN") {
    dispatch({
      type: LOGIN,
      payload: {
        token: token
      }
    });
    loadUser(token);
  } else {
    dispatch(notifyUser((JSON.parse(response.data.content).message, "error")));
  }
};

// Decode JWT and get user object
export const loadUser = token => async dispatch => {
  const jwt = require("jsonwebtoken");
  let user = jwt.verify(token, "secret-for-testing");

  dispatch({
    type: LOAD_USER,
    payload: user
  });
};

// Logout user & remove token from localstorage
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

export const getAuth = () => dispatch => {
  dispatch({ type: GET_AUTH });
};

export const register = newUser => async dispatch => {
  console.log(newUser);
  const response = await axios.post(
    `http://${ip}:8094/account/register`,
    querystring.stringify(newUser),
    { "Content-Type": "application/x-www-form-urlencoded" }
  );
  dispatch({
    type: REGISTER,
    payload: response.data
  });
};

export const setToken = token => dispatch => {
  console.log("%c AUTH_setToken", "color: orange; font-weight: bold");
  console.log(
    `Authenticated: ${token.isAuthenticated} & Token: ${token.token}`
  );

  const jwt = require("jsonwebtoken");
  const user = jwt.verify(token.token, "secret-for-testing");

  dispatch({
    type: SET_AUTH,
    payload: {
      token: token.token,
      isAuthenticated: token.isAuthenticated,
      user
    }
  });
};
