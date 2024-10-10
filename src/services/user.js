import axiosConfig from "../axiosConfig";

export const apiGetUserDetail = () =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axiosConfig({
        method: "POST",
        url: "/rentalHome/users/details",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiSocialLogin = (loginType) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/rentalHome/authenticate/social-login",
        params: loginType,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetUserAccountType = (accountType) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: `/rentalHome/authenticate/${accountType}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiUpdateUser = (userId, formData) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "PUT",
        url: `/rentalHome/users/${userId}`,
        data: formData,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiVerifyOtp = (payload, accountType) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: `/rentalHome/users/verify/${accountType}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
