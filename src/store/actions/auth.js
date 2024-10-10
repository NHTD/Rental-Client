import actionTypes from "./actionTypes";
import {
  apiRegister,
  apiSignIn,
  apiSocialLoginCallback,
} from "../../services/auth";
import { apiSocialLogin } from "../../services/user";

// export const register = (payload) => async (dispatch) => {
//   try {
//     const response = await apiRegister(payload);
//     if (response.data) {
//       dispatch({
//         type: actionTypes.REGISTER_SUCCESS,
//         data: response.data,
//       });
//     } else {
//       dispatch({
//         type: actionTypes.REGISTER_FAIL,
//         data: null,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.REGISTER_FAIL,
//       data: null,
//     });
//   }
// };

// export const signIn = (payload) => async (dispatch) => {
//   try {
//     const response = await apiSignIn(payload);
//     if (response.data) {
//       dispatch({
//         type: actionTypes.SIGN_IN_SUCCESS,
//         data: response.data.data.token,
//       });
//     } else {
//       dispatch({
//         type: actionTypes.SIGN_IN_FAIL,
//         data: response.data.message,
//       });
//     }
//   } catch (error) {
//     dispatch({
//       type: actionTypes.SIGN_IN_FAIL,
//       data: null,
//     });
//   }
// };

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const socialLogin = (loginType) => async (dispatch) => {
  try {
    const response = await apiSocialLogin(loginType);
    if (response.data) {
      dispatch({
        type: actionTypes.SOCIAL_LOGIN,
        url: response.data,
      });
    } else {
      dispatch({
        type: actionTypes.SOCIAL_LOGIN,
        url: "",
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SOCIAL_LOGIN,
      url: "",
    });
  }
};

export const socialLoginCallback = (typeParams) => async (dispatch) => {
  try {
    const response = await apiSocialLoginCallback(typeParams);
    if (response.data) {
      dispatch({
        type: actionTypes.SOCIAL_LOGIN_CALLBACK,
        data: response.data.data.token,
      });
    } else {
      dispatch({
        type: actionTypes.SOCIAL_LOGIN_CALLBACK,
        data: null,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.SOCIAL_LOGIN_CALLBACK,
      data: null,
    });
  }
};
