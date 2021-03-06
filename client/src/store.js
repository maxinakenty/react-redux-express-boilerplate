import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './ducks';
import { IS_DEVELOPMENT } from '../../tools/constants';

export const history = createBrowserHistory();
const middleware = routerMiddleware(history);

const store = createStore(
  rootReducer,
  IS_DEVELOPMENT
    ? composeWithDevTools(applyMiddleware(middleware))
    : applyMiddleware(middleware),
);

export default store;
