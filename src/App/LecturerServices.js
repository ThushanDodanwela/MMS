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
