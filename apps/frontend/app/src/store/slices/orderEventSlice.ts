import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface orderSlice {
    value: {
        orderId: string,
        symbol: string,
        status: string,
        quantity : number
    }

}

const initialState: orderSlice = {
    value: {
        orderId: "",
        symbol: "",
        status: "",
        quantity: 0
    }
}

type reducerPayloadType = {
    orderId: string
    symbol: string
    status: string
    quantity : number

}

export const orderEventSlice = createSlice({
    name: "orderSlice",
    initialState,
    reducers: {
        setLastOrderEvent: (state, action: PayloadAction<reducerPayloadType>) => {
            state.value.orderId = action.payload.orderId
            state.value.symbol = action.payload.symbol
            state.value.status = action.payload.status
            state.value.quantity = action.payload.quantity

        }
    }
})

export const { setLastOrderEvent } = orderEventSlice.actions
export default orderEventSlice.reducer