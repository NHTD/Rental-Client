import { apiGetDistricts } from "../../services/district";
import actionTypes from "./actionTypes";

export const getDistricts = () => async (dispatch) => {
  try {
    const response = await apiGetDistricts();
    if (response.data) {
      dispatch({
        type: actionTypes.GET_DISTRICTS,
        districts: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_DISTRICTS,
      districts: [],
    });
  }
};
