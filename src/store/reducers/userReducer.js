import actionTypes from "../actions/actionTypes";

const initState = {
  userDetail: {},
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_USER_DETAIL:
      return {
        ...state,
        userDetail: action.userDetail,
      };

    case actionTypes.GET_USER_ACCOUNT_TYPE:
      return {
        ...state,
        userDetail: action.userDetail,
      };

    default:
      return state;
  }
};

export default userReducer;
