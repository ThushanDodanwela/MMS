import { post } from "./apiManager";

export const getAllLecturers = (onSuccess) => {
  post("lecturer/get-all", {}, onSuccess);
};

export const newLecturer = (body, onSuccess) => {
  post("lecturer/new-lecturer", body, onSuccess);
};

export const updateLecturer = (body, onSuccess) => {
  post("lecturer/update-lecturer", body, onSuccess);
};

export const lecturerLoginAPI = (body, onSuccess, onFailed) => {
  post("lecturer/login", body, onSuccess, onFailed);
};

//-----------------password reset ---------------------
export const sendOTP = (body, onSuccess, onFailed) => {
  post("lecturer/send-otp", body, onSuccess, onFailed);
};
export const verifyOTP = (body, onSuccess, onFailed) => {
  post("lecturer/verify-otp", body, onSuccess, onFailed);
};
export const resetPasswordAPI = (body, onSuccess, onFailed) => {
  post("lecturer/reset-password", body, onSuccess, onFailed);
};
//-----------------password reset ---------------------
