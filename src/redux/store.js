import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import taskReducer from './slices/taskSlice';
import themeReducer from './slices/themeSlice';
import viewReducer from './slices/viewSlice'
import sidebarReducer from './slices/sidebarSlice'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'tasks', 'theme', 'view', 'sidebar']
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedTaskReducer = persistReducer(persistConfig, taskReducer);
const persistedThemeReducer = persistReducer(persistConfig, themeReducer);
const persistedViewReducer = persistReducer(persistConfig, viewReducer);
const persistedSidebarReducer = persistReducer(persistConfig, sidebarReducer);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        tasks: persistedTaskReducer,
        theme: persistedThemeReducer,
        view: persistedViewReducer,
        sidebar: persistedSidebarReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
