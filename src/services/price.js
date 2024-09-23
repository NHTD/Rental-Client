import axiosConfig from "../axiosConfig";

export const apiGetPrices = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/rentalHome/prices",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
