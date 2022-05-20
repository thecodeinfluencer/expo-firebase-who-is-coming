import { useFonts } from '@expo-google-fonts/inter';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './redux/reducers/rootReducer';
import Routes from './Routes';

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

  // Fonts

  let [fontsLoaded] = useFonts({
    Nunito: require('./assets/fonts/Nunito.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator />;
  }

  return (
    <Provider store={store}>
      <Routes />
    </Provider>
  );
}
