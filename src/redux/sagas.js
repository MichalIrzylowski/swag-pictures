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
  //REGISTER_REQUEST_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_REQUEST_FAIL,
  //LOGIN_REQUEST_SUCCESS
  SET_CURRENT_USER,
  LOGOUT
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
      yield put({type: SET_CURRENT_USER, payload: registeredUserData})
      sessionStorage.setItem('jwtToken', registeredUserData.token)
    } catch (e) {
      yield put({type: REGISTER_REQUEST_FAIL, payload: e})
    }
    yield takeEvery(LOGOUT, logoutFlow)
  }
}

function* loginFlow () {
  while (true) {
    const request = yield take(LOGIN_REQUEST);
    try {
      const user = yield call(apiCall, 'post', 'api/auth/login', request.payload);
      yield put({type: SET_CURRENT_USER, payload: user});
      sessionStorage.setItem('jwtToken', user.token);
    } catch (e) {
      yield put({type: LOGIN_REQUEST_FAIL, payload: e})
    }
    yield takeEvery(LOGOUT, logoutFlow)
  }
}

function* logoutFlow () {
  yield take(LOGOUT);
  yield put({type: LOGOUT})
}

export default function* rootSaga () {
  yield takeEvery(APP_INIT, appInitiated);
  yield fork(registerFlow);
  yield fork(loginFlow);
}
