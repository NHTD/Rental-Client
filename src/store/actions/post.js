import {
  apiCreatePost,
  apiGetNewPosts,
  apiGetPosts,
  apiGetPostsLimit,
  apiGetPostsOfUser,
  apiUploadImages,
} from "../../services/post";
import actionTypes from "./actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    const response = await apiGetPosts();

    if (response.data.postResponse) {
      dispatch({
        type: actionTypes.GET_POSTS,
        posts: response.data.postResponse,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS,
      posts: null,
    });
  }
};

export const getPostsLimit = (query) => async (dispatch) => {
  try {
    const response = await apiGetPostsLimit(query);

    if (response.data.postResponse) {
      dispatch({
        type: actionTypes.GET_POSTS_LIMIT,
        posts: response.data.postResponse,
        totalPage: response.data.totalPage,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_LIMIT,
      posts: null,
      totalPage: 0,
    });
  }
};

export const getNewPosts = () => async (dispatch) => {
  try {
    const response = await apiGetNewPosts();
    dispatch({
      type: actionTypes.GET_NEW_POSTS,
      newPosts: response.data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.GET_NEW_POSTS,
      newPosts: [],
    });
  }
};

export const uploadImages = (images, postId) => async (dispatch) => {
  try {
    const response = await apiUploadImages(images, postId);
    if(response.data) {
      dispatch({
        type: actionTypes.UPLOAD_IMAGE,
        images: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPLOAD_IMAGE,
      images: [],
    });
  }
};

export const createPost = (formData) => async (dispatch) => {
  try {
    const response = await apiCreatePost(formData);
    if(response.data) {
      dispatch({
        type: actionTypes.CREATE_POST,
        post: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.CREATE_POST,
      post: {},
    });
  }
};

export const getPostsOfUser = (query, token) => async (dispatch) => {
  try {
    const response = await apiGetPostsOfUser(query, token);
    if(response.data) {
      dispatch({
        type: actionTypes.GET_POSTS_OF_USER,
        postsOfUser: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POSTS_OF_USER,
      postsOfUser: {},
    });
  }
};
