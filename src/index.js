import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {composeWithDevTools} from 'redux-devtools-extension';

import { BrowserRouter } from 'react-router-dom';

import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

// === CONFIGURE REDUX === //
import rootReducer from './redux/store';
import { APP_INIT } from './redux/ActionTypes';
import rootSaga from './redux/sagas';

const sagaMiddleware = createSagaMiddleware();
var middlewares = [sagaMiddleware];

if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, logger];
}

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga)

store.dispatch({type: APP_INIT})

ReactDOM.render(

  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>

  , document.getElementById('root'));
registerServiceWorker();
