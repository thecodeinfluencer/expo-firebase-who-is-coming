import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
import Start from './Start';

const storeName = '@whosv1';
const middleware = [thunk];

export default function App() {
  const [persistedStorage, setPersistedStorage] = useState({});

  const saveToAsyncStorage = async state => {
    try {
      const stringState = JSON.stringify(state);
      await AsyncStorage.setItem(storeName, stringState);
    } catch (err) {
      console.log('Error saving state to async storage: ', err);
    }
  };

  const loadFromAsyncStorage = async () => {
    try {
      const stringState = await AsyncStorage.getItem(storeName);
      if (stringState === null) return undefined;
      setPersistedStorage(JSON.parse(stringState));
      return JSON.parse(stringState);
    } catch (err) {
      return undefined;
    }
  };

  useEffect(() => {
    loadFromAsyncStorage();
  }, []);

  const store = createStore(
    rootReducer,
    persistedStorage,
    composeWithDevTools(applyMiddleware(...middleware))
  );

  store.subscribe(() => saveToAsyncStorage(store.getState()));

  return (
    <Provider store={store}>
      <Start />
    </Provider>
  );
}
