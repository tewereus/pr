export const base_url = "http://localhost:3773/api/v1";

const getTokenFromLocalStorage = localStorage.getItem("printer")
  ? JSON.parse(localStorage.getItem("printer"))
  : null;

export const config = {
  headers: {
    Authorization: `Bearer ${
      getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ""
    }`,
    Accept: "application/json",
  },
};
