import { combineReducers } from "redux";
import * as ActionType from "./ActionTypes";

const loadingTrue = { loading: true, error: "" };
const loadingFalse = { loading: false, error: "" };
const initialUser = {
  isAuthenticated: false,
  user: {
    id: "",
    username: "",
    description: "",
    profileImgUrl: "",
    pictures: [],
    following: []
  }
};

function didAppLoad(state = loadingTrue, action) {
  switch (action.type) {
    case ActionType.APP_INIT:
      return { loading: true };
    case ActionType.APP_INIT_FINISHED:
      return { loading: false };
    default:
      return state;
  }
}

function registration(state = loadingFalse, action) {
  switch (action.type) {
    case ActionType.REGISTER_REQUEST:
      return { loading: true, error: "" };
    case ActionType.REGISTER_REQUEST_SUCCESS:
      return { ...state, loading: false, message: "Registered!" };
    case ActionType.LOGIN_REQUEST_SUCCESS:
      return { ...state, error: "" };
    case ActionType.REGISTER_REQUEST_FAIL:
      return { error: action.payload, loading: false };
    default:
      return state;
  }
}

function login(state = loadingFalse, action) {
  switch (action.type) {
    case ActionType.LOGIN_REQUEST:
      return { loading: true, error: "" };
    case ActionType.LOGIN_REQUEST_SUCCESS:
      return { ...state, loading: false, message: "Logged in!" };
    case ActionType.REGISTER_REQUEST_SUCCESS:
      return { ...state, error: "" };
    case ActionType.LOGIN_REQUEST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function currentUser(state = initialUser, action) {
  switch (action.type) {
    case ActionType.SET_CURRENT_USER:
      return { user: action.payload, isAuthenticated: true };
    case ActionType.ADD_PICTURE_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          pictures: [...state.user.pictures, action.payload]
        }
      };
    case ActionType.DELETE_PICTURE_SUCCESS:
      const filteredPicturesList = state.user.pictures.filter(
        p => p._id !== action.payload
      );
      return {
        ...state,
        user: { ...state.user, pictures: filteredPicturesList }
      };
    case ActionType.UPDATE_PROFILE_SUCCESS:
      return { ...state, user: { ...state.user, ...action.payload } };
    case ActionType.HANDLE_FOLLOW_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          following: [...state.user.following, action.payload]
        }
      };
    case ActionType.LOGOUT:
      return { ...state, loading: true };
    case ActionType.LOGOUT_SUCCESS:
      return initialUser;
    default:
      return state;
  }
}

function addPicture(state = loadingFalse, action) {
  switch (action.type) {
    case ActionType.ADD_PICTURE_REQUEST:
      return { loading: true };
    case ActionType.ADD_PICTURE_SUCCESS:
      return { loading: false, message: "Succesfully added a picture!" };
    case ActionType.ADD_PICTURE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function deletePicture(state = loadingFalse, action) {
  switch (action.type) {
    case ActionType.DELETE_PICTURE_REQUEST:
      return { loading: true };
    case ActionType.DELETE_PICTURE_SUCCESS:
      return { loading: false, message: "Picture deleted!" };
    case ActionType.DELETE_PICTURE_FAIL:
      return { loading: true, error: action.payload };
    default:
      return state;
  }
}

function updateProfile(state = loadingFalse, action) {
  switch (action.type) {
    case ActionType.UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case ActionType.UPDATE_PROFILE_SUCCESS:
      return { loading: false, message: "Profile updated!" };
    case ActionType.UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function searchUsers(state = { loading: false, foundUsers: [] }, action) {
  switch (action.type) {
    case ActionType.SEARCH_FOR_USER_REQUEST:
      return { ...state, loading: true };
    case ActionType.SEARCH_FOR_USER_SUCCESS:
      return { ...state, loading: false, foundUsers: action.payload };
    case ActionType.SEARCH_FOR_USER_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

function followUser(state = loadingFalse, action) {
  switch (action.type) {
    case ActionType.HANDLE_FOLLOW_REQUEST:
      return { loading: true };
    case ActionType.HANDLE_FOLLOW_SUCCESS:
      return { loading: false, message: "You are now following a new person!" };
    case ActionType.HANDLE_FOLLOW_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function loadPictures(state = { loading: false, pictures: [] }, action) {
  switch (action.type) {
    case ActionType.LOAD_PICTURES:
      return { loading: true, pictures: [] };
    case ActionType.LOAD_PICTURES_SUCCESS:
      return { loading: false, pictures: [...action.payload] };
    case ActionType.ADD_COMMENT_SUCCESS:
      let pictures = state.pictures.map(p => {
        if (p._id === action.payload.commentTo) {
          p.comments.push(action.payload._id);
          return p;
        } else {
          return p;
        }
      });
      return { ...state, pictures };
    case ActionType.DELETE_COMMENT_SUCCESS:
      let foundPicture = state.pictures.find(
        p => p._id === action.payload.pictureId
      );
      let updatedCommentsOfAPicture = foundPicture.comments.filter(
        c => c !== action.payload.commentId
      );
      foundPicture.comments = updatedCommentsOfAPicture;
      let updatedPictures = state.pictures.map(p => {
        if (p._id === foundPicture._id) {
          return foundPicture;
        } else {
          return p;
        }
      });
      return { ...state, pictures: updatedPictures };
    case ActionType.LOAD_PICTURES_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.LOGOUT_SUCCESS:
      return { loading: false, pictures: [] };
    default:
      return state;
  }
}

function addComment(state = loadingFalse, action) {
  switch (action.type) {
    case ActionType.ADD_COMMENT_REQUEST:
      return { loading: true };
    case ActionType.ADD_COMMENT_SUCCESS:
      return { loading: false, message: "Added Coment!" };
    case ActionType.ADD_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

function showComments(state = { loading: false, comments: {} }, action) {
  switch (action.type) {
    case ActionType.SHOW_COMMENTS_REQUEST:
      return { ...state, loading: true };
    case ActionType.SHOW_COMMENTS_SUCCESS:
      let commentsToPictures = { ...state.comments };
      if (!commentsToPictures[action.payload[0].commentTo._id]) {
        commentsToPictures[action.payload[0].commentTo._id] = action.payload;
      } else {
        commentsToPictures[action.payload[0].commentTo._id] = action.payload;
      }
      return { loading: false, comments: commentsToPictures };
    case ActionType.ADD_COMMENT_SUCCESS:
      if (state.comments[action.payload.commentTo]) {
        let comments = { ...state.comments };
        comments[action.payload.commentTo] = [
          ...comments[action.payload.commentTo],
          action.payload
        ];
        return { ...state, comments };
      }
      return { ...state, comments: { ...state.comments } };
    case ActionType.DELETE_COMMENT_SUCCESS:
      let filteredComments = state.comments[action.payload.pictureId].filter(
        c => c._id !== action.payload.commentId
      );
      return {
        ...state,
        comments: {
          ...state.comments,
          [action.payload.pictureId]: filteredComments
        }
      };
    case ActionType.SHOW_COMMENTS_FAIL:
      return { loading: false, error: action.payload };
    case ActionType.LOGOUT_SUCCESS:
      return { ...state, comments: {} };
    default:
      return state;
  }
}

export default combineReducers({
  didAppLoad,
  registration,
  login,
  currentUser,
  addPicture,
  deletePicture,
  updateProfile,
  searchUsers,
  followUser,
  loadPictures,
  addComment,
  showComments
});
