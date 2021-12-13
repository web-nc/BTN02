import { LOGIN_SUCCESS, LOGOUT } from "../types";

const token = JSON.parse(localStorage.getItem("token"));
const initialState = token ? { loggedIn: true, token: token } : { loggedIn: false, token: null };

export default function reducer(state = initialState, action) {


  const { type, token } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        token: token
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false,
        token: null
      };
    default:
      return state;
  }
}