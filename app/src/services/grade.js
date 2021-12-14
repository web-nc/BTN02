import axios from "axios";


const API_URL = process.env.REACT_APP_BACKEND_URL + "/grade";

export function getGrades(courseId) {
  return axios.get(API_URL + '/' + courseId);
}

export function editGrade(data) {
  return axios.post(API_URL + '/edit', { data });
}