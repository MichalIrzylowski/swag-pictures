import { combineReducers } from 'redux';
import {
  APP_INIT,
  APP_INIT_FINISHED,
  REGISTER_REQUEST,
  REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAIL,
  LOGIN_REQUEST,
  LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAIL,
  SET_CURRENT_USER,
  LOGOUT,
  LOGOUT_SUCCESS,
  ADD_PICTURE_REQUEST,
  ADD_PICTURE_SUCCESS,
  ADD_PICTURE_FAIL,
  DELETE_PICTURE_REQUEST,
  DELETE_PICTURE_SUCCESS,
  DELETE_PICTURE_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  SEARCH_FOR_USER_REQUEST,
  SEARCH_FOR_USER_SUCCESS,
  SEARCH_FOR_USER_FAIL,
  HANDLE_FOLLOW_REQUEST,
  HANDLE_FOLLOW_SUCCESS,
  HANDLE_FOLLOW_FAIL,
  LOAD_PICTURES,
  LOAD_PICTURES_SUCCESS,
  LOAD_PICTURES_FAIL
} from './ActionTypes'

const loadingTrue = {loading: true};
const loadingFalse = {loading: false};
const initialUser = {isAuthenticated: false,
                     user: {
                       id: '',
                       username: '',
                       description: '',
                       profileImgUrl: '',
                       pictures: [],
                       following: []
                     }
                   };

function didAppLoad(state=loadingTrue, action) {
  switch (action.type) {
    case APP_INIT:
      return {loading: true};
    case APP_INIT_FINISHED:
      return {loading: false};
    default:
      return state;
  }
};

function registration (state=loadingFalse, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {loading: true};
    case REGISTER_REQUEST_SUCCESS:
       return {loading: false, message: 'Registered!'};
    case REGISTER_REQUEST_FAIL:
      return {error: action.payload, loading: false};
    default:
      return state
  }
};

function login (state=loadingFalse, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {loading: true};
    case LOGIN_REQUEST_SUCCESS:
      return {loading: false, message: 'Logged in!'}
    case LOGIN_REQUEST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state
  }
};

function currentUser (state=initialUser, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {user: action.payload, isAuthenticated: true};
    case ADD_PICTURE_SUCCESS:
      return {...state, user: {...state.user, pictures: [...state.user.pictures, action.payload]}}
    case DELETE_PICTURE_SUCCESS:
      const filteredPicturesList = state.user.pictures.filter( p => p._id !== action.payload);
      return {...state, user: {...state.user, pictures: filteredPicturesList}}
    case UPDATE_PROFILE_SUCCESS:
      return {...state, user: {...state.user, ...action.payload}}
    case HANDLE_FOLLOW_SUCCESS:
      return {...state, user: {...state.user, following: [...state.user.following, action.payload]}}
    case LOGOUT:
      return {isAuthenticated: true, loading: true};
    case LOGOUT_SUCCESS:
      return initialUser
    default:
      return state;
  }
};

function addPicture (state=loadingFalse, action) {
  switch (action.type) {
    case ADD_PICTURE_REQUEST:
      return {loading: true};
    case ADD_PICTURE_SUCCESS:
      return {loading: false, message: 'Succesfully added a picture!'};
    case ADD_PICTURE_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state;
  }
};

function deletePicture (state = loadingFalse, action) {
  switch (action.type) {
    case DELETE_PICTURE_REQUEST:
      return {loading: true}
    case DELETE_PICTURE_SUCCESS:
      return {loading: false, message: 'Picture deleted!'}
    case DELETE_PICTURE_FAIL:
      return {loading: true, error: action.payload}
    default:
      return state;
  }
};

function updateProfile (state = loadingFalse, action) {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return {loading: true}
    case UPDATE_PROFILE_SUCCESS:
      return {loading: false, message: 'Profile updated!'}
    case UPDATE_PROFILE_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
};

function searchUsers (state = {loading: false, foundUsers: []}, action) {
  switch (action.type) {
    case SEARCH_FOR_USER_REQUEST:
      return {...state, loading: true};
    case SEARCH_FOR_USER_SUCCESS:
      return {...state, loading: false, foundUsers: action.payload};
    case SEARCH_FOR_USER_FAIL:
      return {...state, loading: false, error: action.payload}
    default:
      return state;
  }
};

function followUser (state = loadingFalse, action) {
  switch (action.type) {
    case HANDLE_FOLLOW_REQUEST:
      return {loading: true}
    case HANDLE_FOLLOW_SUCCESS:
      return {loading: false, message: 'You are now following a new person!'}
    case HANDLE_FOLLOW_FAIL:
      return {loading: false, error: action.payload}
    default:
      return state;
  }
}

function loadPictures (state = {loading: false, pictures: []}, action) {
  switch (action.type) {
    case LOAD_PICTURES:
      return {loading: true, pictures:[]}
    case LOAD_PICTURES_SUCCESS:
      return {loading: false, pictures: [...action.payload]}
    case LOAD_PICTURES_FAIL:
      return {loading: false, error: action.payload}
    case LOGOUT_SUCCESS:
      return {loading: false, pictures: []}
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
  loadPictures
})
