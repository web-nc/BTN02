import axios from "axios";


const API_URL = process.env.REACT_APP_BACKEND_URL + "/grade";

export function getGrades(courseId, studentId) {
  return axios.get(API_URL + '/' + courseId + '?studentId=' + studentId);
}