import {
  apiCreatePost,
  apiDeleteImage,
  apiGetNewPosts,
  apiGetPostById,
  apiGetPosts,
  apiGetPostsLimit,
  apiGetPostsOfUser,
  apiUpdatePost,
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

export const editData = (dataEdit) => ({
  type: actionTypes.DATA_EDIT,
  dataEdit
})

export const resetDataEdit = () => ({
  type: actionTypes.RESET_DATA_EDIT,
  dataEdit: {}
})

export const updatePost = (postId, formData) => async (dispatch) => {
  try {
    const response = await apiUpdatePost(postId, formData);
    if(response.data) {
      dispatch({
        type: actionTypes.UPDATE_POST,
        post: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.UPDATE_POST,
      post: {},
    });
  }
};

export const deleteImage = (imageUrl) => async (dispatch) => {
  try {
    const response = await apiDeleteImage(imageUrl);
    if(response.data) {
      dispatch({
        type: actionTypes.DELETE_IMAGE,
        msg: response.data,
      });
    }
  } catch (error) {
    dispatch({
      type: actionTypes.DELETE_IMAGE,
      msg: "",
    });
  }
};

export const getPostById = (postId) => async (dispatch) => {
  try {
    const response = await apiGetPostById(postId);
    if(response.data) {
      dispatch({
        type: actionTypes.GET_POST_BY_ID,
        post: response.data
      })
    }
  } catch (error) {
    dispatch({
      type: actionTypes.GET_POST_BY_ID,
      post: {}
    })
  }
}