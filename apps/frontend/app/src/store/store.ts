import { configureStore } from '@reduxjs/toolkit'
import symbolReducer from './slices/symbolSlice'
export const store = configureStore({
    reducer: {
        symbols: symbolReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch