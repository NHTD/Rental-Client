import actionTypes from "../actions/actionTypes";

const initState = {
  isLoggedIn: false,
  token: null,
  msg: "",
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.REGISTER_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
      };
    case actionTypes.REGISTER_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        msg: action.data,
        token: null,
      };
    case actionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
      };
    case actionTypes.SIGN_IN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        msg: action.data,
        token: null,
      };
    case actionTypes.SOCIAL_LOGIN:
      return {
        ...state,
        url: action.url
      };
    case actionTypes.SOCIAL_LOGIN_CALLBACK:
      return {
        ...state,
        isLoggedIn: true,
        token: action.data,
      }; 
    case actionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        msg: "",
        token: null,
      };

    default:
      return state;
  }
};

export default authReducer;
