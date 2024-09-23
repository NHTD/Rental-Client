import actionTypes from "../actions/actionTypes";

const initState = {
  areas: [],
};

export const areaReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_AREAS:
      return {
        ...state,
        areas: action.areas,
      };

    default:
      return state;
  }
};
