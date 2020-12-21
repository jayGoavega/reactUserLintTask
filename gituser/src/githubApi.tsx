import { gitUserType } from "./utils";
import axios from "axios";
// Getting data from github user api
export const gitUserApiCall = async () => {
  const res = await axios.get<gitUserType[]>(
    "https://api.github.com/users?since=135"
  );
  const result = res.data;
  return result;
};

const wrapPromise = (promise: Promise<gitUserType[]>) => {
  let status: string = "pending";
  let result: gitUserType[];
  let suspender: Promise<void> = promise.then(
    (r: gitUserType[]): void => {
      status = "success";
      result = r;
    },
    (err): void => {
      status = "error";
      result = err;
    }
  );

  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      }
      return result;
    },
  };
};

export const createResource = () => {
  return {
    api: wrapPromise(gitUserApiCall()),
  };
};
