import actionTypes from "../actions/actionTypes";

const initState = {
    category: [],
    msg: ""
}

export const categoryReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.GET_CATEGORY:
            return {
                ...state,
                category: action.category,
                msg: ""
            }
        default:
            return state;
    }
}