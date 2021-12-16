import axios from "axios";

// Gắn token vào header của request
// axios.defaults.headers.common['Authorization'] = 'Bearer ' + JSON.parse(localStorage.getItem('token'));
axios.interceptors.request.use((config) => {
  config.headers["Authorization"] = "Bearer " + JSON.parse(localStorage.getItem("token"));
  return config;
});

const API_URL = process.env.REACT_APP_BACKEND_URL + "/course";

export function getCourses() {
  return axios.get(API_URL);
}

export function getOneCourse(id) {
  return axios.get(API_URL + "/" + id);
}

export function getPublicInfoCourse(id, inviteCode, teacherInvite = false) {
  const url = teacherInvite
    ? API_URL + "/public/" + id + "?inviteCode=" + inviteCode
    : API_URL + "/public/" + id + "?code=" + inviteCode;
  return axios.get(url);
}

export function createCourse(name, details, briefName) {
  return axios.post(API_URL, { name, details, briefName });
}

export function joinCourse(code, teacherInvite = false) {
  return axios.post(API_URL + "/join", { code, teacherInvite });
}

export function inviteTeacher(email, course) {
  return axios.post(API_URL + "/invite/teacher", { email, course });
}

export function inviteStudent(email, course) {
  return axios.post(API_URL + "/invite/student", { email, course });
}

export function updateOneCourse(id, name, details, briefName) {
  return axios.put(API_URL + "/" + id, { name, details, briefName });
}

export function deleteOneCourse(id) {
  return axios.delete(API_URL + "/" + id);
}

export function leaveCourse(courseId) {
  return axios.post(API_URL + "/leaveCourse", { courseId });
}

export function updateGradeBoard(id, data) {
  return axios.put(API_URL + "/" + id + "/gradeboard", { data });
}

