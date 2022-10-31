import { post } from "./apiManager";

export const getAllocations = (onSuccess) => {
  post("allocations/get-all", {}, onSuccess);
};
export const newAllocation = (body, onSuccess) => {
  post("allocations/new-allocation", body, onSuccess);
};

export const updateAllocation = (body, onSuccess) => {
  post("allocations/update-allocation", body, onSuccess);
};

export const isAllocated = (body, onSuccess) => {
  post("allocations/is-allocated", body, onSuccess);
};
