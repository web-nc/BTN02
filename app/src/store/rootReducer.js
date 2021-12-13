import { combineReducers } from "redux";
import auth from "./reducers/auth";
import courses from "./reducers/courses";
import user from "./reducers/user";

export default combineReducers({ courses, auth, user });
