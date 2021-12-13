import { USER_EMPTY, USER_FETCHED, USER_UPDATE } from "../types";

const initialState = {
  studentID: "",
  email: "",
  firstname: "",
  lastname: "",
  gender: "",
  isSocialAcc: false,
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case USER_EMPTY:
      return {
        ...state,
      };
    case USER_FETCHED:
      return {
        ...state,
        // info: payload,
        studentID: payload.studentID,
        email: payload.email,
        firstname: payload.firstname,
        lastname: payload.lastname,
        gender: payload.gender,
        isSocialAcc: payload.password === "",
      };
    case USER_UPDATE:
      return {
        ...state,
        // info: payload,
        studentID: payload.studentID,
        email: payload.email,
        firstname: payload.firstname,
        lastname: payload.lastname,
        gender: payload.gender,
      };
    default:
      return state;
  }
}
