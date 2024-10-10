import actionTypes from "../actions/actionTypes";

const initState = {
  districts: [],
};

export const districtReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_DISTRICTS:
      return {
        ...state,
        districts: action.districts,
      };

      case actionTypes.GET_DISTRICTS_BY_PROVINCE_ID:
      return {
        ...state,
        districts: action.districts,
      };

    default:
      return state;
  }
};
