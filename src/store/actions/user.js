import { apiGetUserAccountType, apiGetUserDetail } from "../../services/user";
import actionTypes from "./actionTypes";

export const getUserDetail = () => async (dispatch) => {
  try {
    const response = await apiGetUserDetail();
    if (response.data) {
      dispatch({
        type: actionTypes.GET_USER_DETAIL,
        userDetail: response.data,
      });
    }else{
      dispatch({
        type: actionTypes.GET_USER_DETAIL,
        userDetail: [],
      });
      dispatch({type: actionTypes.LOGOUT})
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_DETAIL,
      userDetail: [],
    });
    dispatch({type: actionTypes.LOGOUT})
  }
};

export const getUserAccountType = (accountType) => async (dispatch) => {
  try {
    const response = await apiGetUserAccountType(accountType);
    console.log(response.data)
    if (response.data) {
      dispatch({
        type: actionTypes.GET_USER_ACCOUNT_TYPE,
        userDetail: response.data,
      });
    }else{
      dispatch({
        type: actionTypes.GET_USER_ACCOUNT_TYPE,
        userDetail: [],
      });
      dispatch({type: actionTypes.LOGOUT})
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_USER_ACCOUNT_TYPE,
      userDetail: [],
    });
    dispatch({type: actionTypes.LOGOUT})
  }
};
