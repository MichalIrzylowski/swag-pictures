import { combineReducers } from 'redux';
import {
  APP_INIT,
  APP_INIT_FINISHED
} from './ActionTypes'

const loading = {loading: true}

function didAppLoad(state=loading, action) {
  switch (action.type) {
    case APP_INIT:
      return {loading: true}
    case APP_INIT_FINISHED:
      return {loading: false}
    default:
      return state;
  }
}

export default combineReducers({
  didAppLoad
})
