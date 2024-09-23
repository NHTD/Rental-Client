import axiosConfig from "../axiosConfig";

export const apiGetUserDetail = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "POST",
        url: "/rentalHome/users/details",
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
        params: loginType
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
    