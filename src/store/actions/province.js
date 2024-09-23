import { apiGetProvinces } from "../../services/province";
import actionTypes from "./actionTypes";

export const getProvinces = () => async (dispatch) => {
  try {
    const response = await apiGetProvinces();
    if (response.data) {
      dispatch({
        type: actionTypes.GET_PROVINCES,
        provinces: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PROVINCES,
      provinces: [],
    });
  }
};
