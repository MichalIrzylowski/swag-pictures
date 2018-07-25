import { takeEvery, put } from 'redux-saga/effects';

import {
  APP_INIT,
  APP_INIT_FINISHED
} from './ActionTypes'

function* appInitiated () {
  yield put({type: APP_INIT_FINISHED});
}

export default function* rootSaga () {
  yield takeEvery(APP_INIT, appInitiated);
}
