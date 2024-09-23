import { apiGetAreas } from "../../services/area";
import actionTypes from "./actionTypes";

export const getAreas = () => async (dispatch) => {
  try {
    const response = await apiGetAreas();
    if (response.data) {
      dispatch({
        type: actionTypes.GET_AREAS,
        areas: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_AREAS,
      areas: [],
    });
  }
};
