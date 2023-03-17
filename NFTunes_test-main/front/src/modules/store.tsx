import { configureStore, ThunkAction, Action, createStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import { FC, ReactNode } from 'react';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

interface AppProps {
  children: ReactNode;
}

// 각 리듀서 임포트. (기능별로 나눠놓은 features 에서)
import counterReducer from '../features/counter/counterSlice';
import userReducer from '../features/user/userSlice';
import modalReducer from './modalSlice';

const persistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
};

// automatically combineReducer
const rootReducer = combineReducers({
  counter: counterReducer,
  user: userReducer,
  modal: modalReducer,
});

const reducer = persistReducer(persistConfig, rootReducer);

// 가져온 리듀서를 createStore() 해줌.
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>;
