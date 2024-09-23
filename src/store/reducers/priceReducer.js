import actionTypes from "../actions/actionTypes";

const initState = {
  prices: [],
};

export const priceReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRICES:
      return {
        ...state,
        prices: action.prices,
      };

    default:
      return state;
  }
};
