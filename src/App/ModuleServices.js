import { post } from "./apiManager";

export const getAllModules = (onSuccess) => {
  post("module/get-all", {}, onSuccess);
};
