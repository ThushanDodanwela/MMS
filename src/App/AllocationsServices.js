import { post } from "./apiManager";

export const newAllocation = (body, onSuccess) => {
  post("allocations/new-allocation", body, onSuccess);
};
