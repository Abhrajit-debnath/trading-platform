import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface symbolState {
    value: string

}

const initialState: symbolState = {
    value: "BTCUSDT"
}

export const symbolSlice = createSlice({
    name: "symbol",
    initialState,
    reducers: {
        setSymbol: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { setSymbol } = symbolSlice.actions
export default symbolSlice.reducer