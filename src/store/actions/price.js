import { apiGetPrices } from "../../services/price";
import actionTypes from "./actionTypes";

export const getPrices = () => async (dispatch) => {
  try {
    const response = await apiGetPrices();
    if (response.data) {
      dispatch({
        type: actionTypes.GET_PRICES,
        prices: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_PRICES,
      prices: [],
    });
  }
};
