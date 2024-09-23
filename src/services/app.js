import axiosDefault from "axios";

export const apiGetProvincesPublic = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "GET",
        url: "https://vapi.vnappmob.com/api/province/",
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });

export const apiGetDistrictsPublic = (provinceId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await axiosDefault({
        method: "GET",
        url: `https://vapi.vnappmob.com/api/province/district/${provinceId}`,
      });
      resolve(response);
    } catch (error) {
      reject(error);
    }
  });
