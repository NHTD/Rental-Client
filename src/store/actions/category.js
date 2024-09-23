import { apiGetCategories } from "../../services/category";
import actionTypes from "./actionTypes";

export const getCategories = () => async (dispatch) => {
  try {
    const response = await apiGetCategories();
    if (response.data) {
      dispatch({
        type: actionTypes.GET_CATEGORY,
        category: response.data,
        msg: "Get categories successful",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_CATEGORY,
      category: [],
      msg: "",
    });
  }
};
