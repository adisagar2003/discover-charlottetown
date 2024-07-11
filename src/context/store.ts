import { createSlice, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { useStore } from 'react-redux';
import { useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage,
  }
  
// Define a type for the slice state
interface UserState {
    value: {user: unknown} | null
}

const initialState: UserState = {
    value: null
}

const authSlice = createSlice({
    name:'auth',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            state.value = {user:action.payload}
        },
        logout: (state) => {
            state.value = null
        }
    }
});

const persistedReducer = persistReducer(persistConfig, authSlice.reducer)

const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
});

export const persistor = persistStore(store)

export const { login, logout } = authSlice.actions

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore

export default store;