import actionTypes from "../actions/actionTypes";

const initState = {
  provinces: [],
};

export const provinceReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PROVINCES:
      return {
        ...state,
        provinces: action.provinces,
      };

    default:
      return state;
  }
};
