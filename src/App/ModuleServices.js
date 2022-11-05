import { post } from "./apiManager";

export const getAllModules = (onSuccess) => {
  post("module/get-all", {}, onSuccess);
};

export const newModule = (body, onSuccess) => {
  post("module/new-module", body, onSuccess);
};

export const updateModule = (body, onsuccess) => {
  post("module/update-module", body, onsuccess);
};

export const isModuleExists = (body, onSuccess, onFailed) => {
  post("module/check-modulecode", body, onSuccess, onFailed);
};
