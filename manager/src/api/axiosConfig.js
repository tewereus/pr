export const base_url = "http://localhost:3773/api/v1";

const getTokenFromLocalStorage = localStorage.getItem("manager")
  ? JSON.parse(localStorage.getItem("manager"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
