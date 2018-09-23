import { takeEvery, put, take, fork, call } from "redux-saga/effects";

import * as ActionType from "./ActionTypes";
import { apiCall } from "../api";

function* appInitiated() {
  yield put({ type: ActionType.APP_INIT_FINISHED });
  yield fork(loginBySessionStorage);
}

function* loginBySessionStorage() {
  while (true) {
    const data = yield take(ActionType.LOGIN_BY_SESSION_STORAGE_REQUEST);
    yield put({ type: ActionType.SET_CURRENT_USER, payload: data.userData });
    yield takeEvery(ActionType.LOGOUT, logoutFlow);
  }
}

function* registerFlow() {
  while (true) {
    const request = yield take(ActionType.REGISTER_REQUEST);
    try {
      const registeredUserData = yield call(
        apiCall,
        "post",
        "/api/auth/register",
        request.payload
      );
      yield put({
        type: ActionType.SET_CURRENT_USER,
        payload: registeredUserData
      });
      yield put({ type: ActionType.REGISTER_REQUEST_SUCCESS });
      sessionStorage.setItem("jwtToken", registeredUserData.token);
      yield takeEvery(ActionType.LOGOUT, logoutFlow);
    } catch (e) {
      yield put({ type: ActionType.REGISTER_REQUEST_FAIL, payload: e });
    }
  }
}

function* loginFlow() {
  while (true) {
    const request = yield take(ActionType.LOGIN_REQUEST);
    try {
      const user = yield call(
        apiCall,
        "post",
        "/api/auth/login",
        request.payload
      );
      yield put({ type: ActionType.SET_CURRENT_USER, payload: user });
      yield put({ type: ActionType.LOGIN_REQUEST_SUCCESS });
      sessionStorage.setItem("jwtToken", user.token);
      yield takeEvery(ActionType.LOGOUT, logoutFlow);
    } catch (e) {
      yield put({ type: ActionType.LOGIN_REQUEST_FAIL, payload: e });
    }
  }
}

function* logoutFlow() {
  yield put({ type: ActionType.LOGOUT_SUCCESS });
}

function* addPictureFlow() {
  while (true) {
    const pictureData = yield take(ActionType.ADD_PICTURE_REQUEST);
    try {
      const picture = yield call(
        apiCall,
        "post",
        `/api/user/${pictureData.userId}/picture`,
        pictureData.payload,
        pictureData.config
      );
      yield put({ type: ActionType.ADD_PICTURE_SUCCESS, payload: picture });
    } catch (e) {
      yield put({ type: ActionType.ADD_PICTURE_FAIL, payload: e });
    }
  }
}

function* removePictureFlow() {
  while (true) {
    const removedPicture = yield take(ActionType.DELETE_PICTURE_REQUEST);
    try {
      yield call(apiCall, "delete", `/api/user/${removedPicture.id}`);
      yield put({
        type: ActionType.DELETE_PICTURE_SUCCESS,
        payload: removedPicture.id
      });
    } catch (e) {
      yield put({ type: ActionType.DELETE_PICTURE_FAIL, payload: e });
    }
  }
}

function* updateProfileFlow() {
  while (true) {
    const updatedProfile = yield take(ActionType.UPDATE_PROFILE_REQUEST);
    try {
      const profile = yield call(
        apiCall,
        "put",
        `/api/user/${updatedProfile.id}`,
        updatedProfile.payload,
        updatedProfile.config
      );
      yield put({ type: ActionType.UPDATE_PROFILE_SUCCESS, payload: profile });
    } catch (e) {
      yield put({ type: ActionType.UPDATE_PROFILE_FAIL, payload: e });
    }
  }
}

function* loadPicturesFlow() {
  while (true) {
    const loadPictures = yield take(ActionType.LOAD_PICTURES);
    try {
      const pictures = yield call(
        apiCall,
        "post",
        "/api/user/getPictures",
        loadPictures.payload
      );
      yield put({ type: ActionType.LOAD_PICTURES_SUCCESS, payload: pictures });
    } catch (e) {
      yield put({ type: ActionType.LOAD_PICTURES_FAIL, payload: e });
    }
  }
}

function* searchUsersFlow() {
  while (true) {
    const searchUserQuery = yield take(ActionType.SEARCH_FOR_USER_REQUEST);
    try {
      const foundUsers = yield call(
        apiCall,
        "post",
        "/api/user/search_users",
        searchUserQuery.payload
      );
      yield put({
        type: ActionType.SEARCH_FOR_USER_SUCCESS,
        payload: foundUsers
      });
    } catch (e) {
      yield put({ type: ActionType.SEARCH_FOR_USER_FAIL, payload: e });
    }
  }
}

function* followUserFlow() {
  while (true) {
    const followedUser = yield take(ActionType.HANDLE_FOLLOW_REQUEST);
    try {
      const succesfulyFollowedUser = yield call(
        apiCall,
        "post",
        "/api/user/follow_user",
        followedUser.payload
      );
      yield put({
        type: ActionType.HANDLE_FOLLOW_SUCCESS,
        payload: succesfulyFollowedUser
      });
    } catch (e) {
      yield put({ type: ActionType.HANDLE_FOLLOW_FAIL, payload: e });
    }
  }
}

function* addCommentFlow() {
  while (true) {
    const comment = yield take(ActionType.ADD_COMMENT_REQUEST);
    // yield delay(10000);
    try {
      const succesfulyAddedComment = yield call(
        apiCall,
        "post",
        "/api/user/addComment",
        comment.payload
      );
      yield put({
        type: ActionType.ADD_COMMENT_SUCCESS,
        payload: succesfulyAddedComment
      });
    } catch (error) {
      yield put({
        type: ActionType.ADD_COMMENT_FAIL,
        payload: error
      });
    }
  }
}

function* showCommentsFlow() {
  while (true) {
    const commentsToShow = yield take(ActionType.SHOW_COMMENTS_REQUEST);
    try {
      const succesfulyFoundComments = yield call(
        apiCall,
        "post",
        "/api/user/find_comments",
        commentsToShow.payload
      );
      yield put({
        type: ActionType.SHOW_COMMENTS_SUCCESS,
        payload: succesfulyFoundComments
      });
    } catch (error) {
      yield put({ type: ActionType.SHOW_COMMENTS_FAIL, payload: error });
    }
  }
}

function* deleteCommentFlow() {
  while (true) {
    const commentToDelete = yield take(ActionType.DELETE_COMMENT_REQUEST);
    try {
      yield call(
        apiCall,
        "delete",
        `/api/user/delete_comment/${commentToDelete.payload.commentId}`
      );
      yield put({
        type: ActionType.DELETE_COMMENT_SUCCESS,
        payload: commentToDelete.payload
      });
    } catch (error) {
      yield put({ type: ActionType.DELETE_COMMENT_FAIL, payload: error });
    }
  }
}

export default function* rootSaga() {
  yield takeEvery(ActionType.APP_INIT, appInitiated);
  yield fork(registerFlow);
  yield fork(loginFlow);
  yield fork(addPictureFlow);
  yield fork(removePictureFlow);
  yield fork(updateProfileFlow);
  yield fork(loadPicturesFlow);
  yield fork(searchUsersFlow);
  yield fork(followUserFlow);
  yield fork(addCommentFlow);
  yield fork(showCommentsFlow);
  yield fork(deleteCommentFlow);
}
