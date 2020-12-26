import { createStore, applyMiddleware } from 'redux';
import { countReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';

function* exampleSaga(action) {
  console.log('Example saga reached');
  yield action;
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(countReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(exampleSaga);
