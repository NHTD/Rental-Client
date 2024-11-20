import axiosConfig from "../axiosConfig";

export const apiGetCategories = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosConfig({
        method: "GET",
        url: "/rental-home/categories",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
