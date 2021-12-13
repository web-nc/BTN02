import axios from "axios";

// Gắn token vào header của request
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token'));
axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));
  return config;
});

const API_URL = process.env.REACT_APP_BACKEND_URL + "/user";

export function getUser() {
  return axios.get(API_URL);
}

export function updateProfile(studentID, firstname, lastname, gender) {
  return axios.put(API_URL, { studentID, firstname, lastname, gender });
}

export function updatePassword(currentPassword, newPassword) {
  return axios.put(API_URL + "/password", { currentPassword, newPassword });
}
