import { post } from "./apiManager";

export const newAllocation = (body, onSuccess) => {
  post("allocations/new-allocation", body, onSuccess);
};

export const isAllocated = (body, onSuccess) => {
  post("allocations/is-allocated", body, onSuccess);
};
