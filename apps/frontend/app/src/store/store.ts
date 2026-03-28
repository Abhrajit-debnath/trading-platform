import { configureStore } from '@reduxjs/toolkit'
import symbolReducer from './slices/symbolSlice'
import sideReducer from './slices/sideSlice'
export const store = configureStore({
    reducer: {
        symbols: symbolReducer,
        side:sideReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch