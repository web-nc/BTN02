import axios from "axios";


const API_URL = process.env.REACT_APP_BACKEND_URL + "/grade";

export function getGrades(courseId) {
  return axios.get(API_URL + '/' + courseId);
}

export function editGrade(data, courseId) {
  return axios.post(API_URL + '/edit/' + courseId, { data });
}

export function studentGetGrades(courseId) {
  return axios.get(API_URL + '/student/' + courseId);
}

export function finalizeGrade(data, courseId) {
  return axios.post(API_URL + '/finalize/' + courseId, { data });
}

export function finalizeAssignment(assignmentId, courseId) {
  return axios.post(API_URL + '/finalizeAssignment/' + courseId, { assignmentId });
}