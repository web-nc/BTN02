import {
  COURSES_EMPTY,
  COURSES_FETCHED,
  COURSES_INCREMENT,
  LEAVE_COURSE,
  COURSES_DECREMENT,
  COURSES_UPDATED,
  COURSES_REFRESHED
} from "../types";

const removeOneCourse = (items, payload) => {
  const i = items.findIndex((element) => element._id === payload._id);
  if (i > -1) {
    items.splice(i, 1);
  }
  return items;
};

const updateOneCouse = (items, payload) => {
  const i = items.findIndex((element) => element._id === payload._id);
  if (i > -1) {
    items[i] = { ...items[i], ...payload };
  }
  return items;
};

const initialState = { items: [] };

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case COURSES_EMPTY:
      return {
        ...state,
        items: [],
      };
    case COURSES_FETCHED:
      return {
        ...state,
        items: payload,
      };
    case COURSES_REFRESHED: //same as "fetched". But it is a different message just for debugging
      return {
        ...state,
        items: payload,
      };
    case COURSES_INCREMENT:
      return {
        ...state,
        items: state.items.concat(payload),
      };
    case COURSES_DECREMENT:
      return {
        ...state,
        items: removeOneCourse(state.items, payload),
      };
    case COURSES_UPDATED:
      return {
        ...state,
        items: updateOneCouse(state.items, payload),
      };
    case LEAVE_COURSE:
      return {
        ...state,
        items: state.items.filter((item) => item._id !== payload._id),
      };
    default:
      return state;
  }
}
