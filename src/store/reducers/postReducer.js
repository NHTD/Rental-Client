import actionTypes from "../actions/actionTypes";

const initState = {
  posts: [],
  msg: "",
  totalPage: 0,
  newPosts: [],
  images: [],
  post: {},
  postsOfUser: [],
  dataEdit: {}
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.GET_POSTS:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
      };

    case actionTypes.GET_POSTS_LIMIT:
      return {
        ...state,
        posts: action.posts || [],
        msg: action.msg || "",
        totalPage: action.totalPage || 0,
      };

    case actionTypes.GET_NEW_POSTS:
      return {
        ...state,
        newPosts: action.newPosts || [],
      };

    case actionTypes.UPLOAD_IMAGE:
      return {
        ...state,
        images: action.images || [],
      };

    case actionTypes.CREATE_POST:
      return {
        ...state,
        post: action.post || {},
      };

    case actionTypes.GET_POSTS_OF_USER:
      return {
        ...state,
        postsOfUser: action.postsOfUser || []
      }

    case actionTypes.DATA_EDIT:
      return {
        ...state, 
        dataEdit: action.dataEdit || {}
      }
    case actionTypes.RESET_DATA_EDIT:
      return {
        ...state, 
        dataEdit: {}
      }
    
    case actionTypes.UPDATE_POST:
      return {
        ...state, 
        post: action.data || {}
      }
    case actionTypes.DELETE_IMAGE:
      return {
        ...state, 
        msg: action.msg || {}
      }
    case actionTypes.GET_POST_BY_ID:
      return {
        ...state,
        post: action.post
      }
    default:
      return state;
  }
};

export default postReducer;
