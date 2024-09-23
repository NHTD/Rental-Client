import axiosConfig from "../axiosConfig";

export const apiGetAreas = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/rentalHome/areas",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
