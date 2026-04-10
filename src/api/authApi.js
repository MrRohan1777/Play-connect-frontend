import axiosClient from "./axiosClient";

export const loginUser = (data) => {
  return axiosClient.post("api/auth/login", data);
};

export const registerUser = (data) => {
  return axiosClient.post("/api/user/register", data);
};

export const forgotPassword = (data) => {
  return axiosClient.post("/api/auth/forgot-password", data);
};

export const resetPassword = (data) => {
  return axiosClient.post("/api/auth/reset-password", data);
};