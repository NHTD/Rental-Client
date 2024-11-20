import axiosConfig from "../axiosConfig";

export const apiRegister = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/rental-home/users",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiSignIn = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/rental-home/authenticate",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      const errorResponse = { ...error };
      reject(errorResponse);
    }
  });

export const apiSocialLoginCallback = (typeParams) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/rental-home/authenticate/social/callback",
        params: typeParams,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiChangePassword = (accountType, payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "PUT",
        url: `/rental-home/authenticate/change-password/${accountType}`,
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiVerifyAccount = (payload) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = axiosConfig({
        method: "POST",
        url: "/rental-home/authenticate/verify-account",
        data: payload,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
