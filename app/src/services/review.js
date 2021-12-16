import axios from "axios";


const API_URL = process.env.REACT_APP_BACKEND_URL + "/review";

export function newReviewRequest(data) {
    return axios.post(API_URL, { data });
}

export function getMyReviewRequest(courseId) {
    return axios.get(API_URL + '/student/' + courseId);
}