import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import AppNavigator from './navigation/AppNavigator';
import userReducer from './store/reducer/users';


const rootReducer = combineReducers({
  users: userReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk))

export default function App() {

  return (
    <Provider store={store}>
      <AppNavigator/>
    </Provider>

  );
}


