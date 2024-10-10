import axiosConfig from "../axiosConfig";

export const apiGetDistricts = () => new Promise(async(resolve, reject) => {
    try{
        const response = await axiosConfig({
            method: "GET",
            url: "/rentalHome/districts"
        })
        resolve(response)
    }catch(error) {
        reject(error)
    }
})

export const apiGetDistrictsByProvinceCode = (provinceCode) => new Promise(async(resolve, reject) => {
    try{
        const response = await axiosConfig({
            method: "GET",
            url: `/rentalHome/districts/${provinceCode}`
        })
        resolve(response)
    }catch(error) {
        reject(error)
    }
})