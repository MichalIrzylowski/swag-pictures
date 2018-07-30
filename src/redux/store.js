import { combineReducers } from 'redux';
import {
  APP_INIT,
  APP_INIT_FINISHED,
  REGISTER_REQUEST,
  // REGISTER_REQUEST_SUCCESS,
  REGISTER_REQUEST_FAIL,
  LOGIN_REQUEST,
  // LOGIN_REQUEST_SUCCESS,
  LOGIN_REQUEST_FAIL,
  SET_CURRENT_USER,
  LOGOUT
} from './ActionTypes'

const loadingTrue = {loading: true};
const loadingFalse = {loading: false};
const isAuthenticated = {isAuthenticated: false};

function didAppLoad(state=loadingTrue, action) {
  switch (action.type) {
    case APP_INIT:
      return {loading: true};
    case APP_INIT_FINISHED:
      return {loading: false};
    default:
      return state;
  }
}

function registration (state=loadingFalse, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return {loading: true};
    // case REGISTER_REQUEST_SUCCESS:
    //   return {data: action.payload, loading: false, isAuthenticated: true};
    case REGISTER_REQUEST_FAIL:
      return {error: action.payload, loading: false};
    default:
      return state
  }
}

function login (state=loadingFalse, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {loading: true};
    // case LOGIN_REQUEST_SUCCESS:
    //   return {loading: false, data: action.payload, isAuthenticated: true}
    case LOGIN_REQUEST_FAIL:
      return {loading: false, error: action.payload};
    default:
      return state
  }
}

function currentUser (state=isAuthenticated, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {currentUser: action.payload, isAuthenticated: true}
    case LOGOUT:
      return isAuthenticated;
    default:
      return state;
  }
}

export default combineReducers({
  didAppLoad,
  registration,
  login,
  currentUser
})
