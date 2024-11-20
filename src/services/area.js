import axiosConfig from "../axiosConfig";

export const apiGetAreas = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/rental-home/areas",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
