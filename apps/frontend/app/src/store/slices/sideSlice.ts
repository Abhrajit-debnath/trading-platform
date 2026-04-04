import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface sideSlice {
    value: string

}

const initialState: sideSlice = {
    value: "BUY"
}

export const sideSlice = createSlice({
    name: "side",
    initialState,
    reducers: {
        setSide: (state, action: PayloadAction<string>) => {
            state.value = action.payload
        }
    }
})

export const { setSide } = sideSlice.actions
export default sideSlice.reducer