import {
  takeEvery,
  put,
  take,
  fork,
  call
} from 'redux-saga/effects';

import {
  APP_INIT,
  APP_INIT_FINISHED,
  REGISTER_REQUEST,
  REGISTER_REQUEST_FAIL,
  REGISTER_REQUEST_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  LOGIN_REQUEST_SUCCESS,
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
  LOAD_PICTURES,
  LOAD_PICTURES_SUCCESS,
  LOAD_PICTURES_FAIL,
  SEARCH_FOR_USER_REQUEST,
  SEARCH_FOR_USER_SUCCESS,
  SEARCH_FOR_USER_FAIL,
  HANDLE_FOLLOW_REQUEST,
  HANDLE_FOLLOW_SUCCESS,
  HANDLE_FOLLOW_FAIL
} from './ActionTypes';

import { apiCall } from '../api';

function* appInitiated () {
  yield put({type: APP_INIT_FINISHED});
}

function* registerFlow () {
  while (true) {
    const request = yield take(REGISTER_REQUEST);
    try {
      const registeredUserData = yield call(apiCall, 'post', '/api/auth/register', request.payload);
      yield put({type: SET_CURRENT_USER, payload: registeredUserData});
      yield put({type: REGISTER_REQUEST_SUCCESS});
      sessionStorage.setItem('jwtToken', registeredUserData.token);
      yield takeEvery(LOGOUT, logoutFlow);
    } catch (e) {
      yield put({type: REGISTER_REQUEST_FAIL, payload: e});
    }

  }
}

function* loginFlow () {
  while (true) {
    const request = yield take(LOGIN_REQUEST);
    try {
      const user = yield call(apiCall, 'post', 'api/auth/login', request.payload);
      yield put({type: SET_CURRENT_USER, payload: user});
      yield put({type: LOGIN_REQUEST_SUCCESS})
      sessionStorage.setItem('jwtToken', user.token);
      yield takeEvery(LOGOUT, logoutFlow);
    } catch (e) {
      yield put({type: LOGIN_REQUEST_FAIL, payload: e})
    }

  }
}

function* logoutFlow () {
  yield put({type: LOGOUT_SUCCESS});
}

function* addPictureFlow() {
  while (true) {
    const pictureData = yield take(ADD_PICTURE_REQUEST);
    try {
      const picture = yield call(apiCall, 'post', `api/user/${pictureData.userId}/picture`, pictureData.payload, pictureData.config);
      yield put({type: ADD_PICTURE_SUCCESS, payload: picture});
    } catch (e) {
      yield put({type: ADD_PICTURE_FAIL, payload: e});
    }
  }
}

function* removePictureFlow() {
  while (true) {
    const removedPicture = yield take(DELETE_PICTURE_REQUEST);
    try {
      yield call(apiCall, 'delete', `api/user/${removedPicture.id}`);
      yield put({type: DELETE_PICTURE_SUCCESS, payload: removedPicture.id});
    } catch (e) {
      yield put({type: DELETE_PICTURE_FAIL, payload: e})
    }
  }
}


function* updateProfileFlow() {
  while(true) {
    const updatedProfile = yield take(UPDATE_PROFILE_REQUEST);
    try {
      const profile = yield call(apiCall, 'put', `/api/user/${updatedProfile.id}`, updatedProfile.payload, updatedProfile.config);
      yield put({type: UPDATE_PROFILE_SUCCESS, payload: profile})
    } catch (e) {
      yield put({type: UPDATE_PROFILE_FAIL, payload: e})
    }
  }
}

function* loadPicturesFlow() {
  while(true) {
    const loadPictures = yield take(LOAD_PICTURES)
    try {
      const pictures = yield call(apiCall, 'post', 'api/user/getPictures', loadPictures.payload);
      yield put({type: LOAD_PICTURES_SUCCESS, payload: pictures})
    } catch (e) {
      yield put({type: LOAD_PICTURES_FAIL, payload: e})
    }
  }
}

function* searchUsersFlow() {
  while(true) {
    const searchUserQuery = yield take(SEARCH_FOR_USER_REQUEST);
    try {
      const foundUsers = yield call(apiCall, 'post', 'api/user/search_users', searchUserQuery.payload);
      yield put({type: SEARCH_FOR_USER_SUCCESS, payload: foundUsers})
    } catch (e) {
      yield put({type: SEARCH_FOR_USER_FAIL, payload: e})
    }
  }
}

function* followUserFlow() {
  while(true) {
    const followedUser = yield take(HANDLE_FOLLOW_REQUEST);
    try {
      const succesfulyFollowedUser = yield call(apiCall, 'post', 'api/user/follow_user', followedUser.payload);
      yield put({type: HANDLE_FOLLOW_SUCCESS, payload: succesfulyFollowedUser});
    } catch (e) {
      yield put({type: HANDLE_FOLLOW_FAIL, payload: e});
    }
  }
}


export default function* rootSaga () {
  yield takeEvery(APP_INIT, appInitiated);
  yield fork(registerFlow);
  yield fork(loginFlow);
  yield fork(addPictureFlow);
  yield fork(removePictureFlow);
  yield fork(updateProfileFlow);
  yield fork(loadPicturesFlow);
  yield fork(searchUsersFlow);
  yield fork(followUserFlow);
}
