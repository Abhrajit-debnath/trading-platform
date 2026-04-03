import { configureStore } from '@reduxjs/toolkit'
import symbolReducer from './slices/symbolSlice'
import sideReducer from './slices/sideSlice'
import orderReducer from "./slices/orderEventSlice"
export const store = configureStore({
    reducer: {
        symbols: symbolReducer,
        side:sideReducer,
        lastOrderEvent : orderReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch