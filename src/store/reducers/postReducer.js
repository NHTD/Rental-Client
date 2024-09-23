import actionTypes from "../actions/actionTypes";

const initState = {
  posts: [],
  msg: "",
  totalPage: 0,
  newPosts: [],
  images: [],
  post: {},
  postsOfUser: []
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
        post: action.post || null,
      };
    case actionTypes.GET_POSTS_OF_USER:
      return {
        ...state,
        postsOfUser: action.postsOfUser || []
      }

    default:
      return state;
  }
};

export default postReducer;
