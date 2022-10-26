import { post } from "./apiManager";

export const getAllLecturers = (onSuccess) => {
  post("lecturer/get-all", {}, onSuccess);
};
