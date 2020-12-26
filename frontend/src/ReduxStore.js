import { createStore, applyMiddleware } from 'redux';
import { countReducer } from './reducers';
import createSagaMiddleware from 'redux-saga';
import 'regenerator-runtime/runtime';

function* exampleSaga(value) {
  console.log('Example saga reached');
  yield value;
}

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(countReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(exampleSaga);
