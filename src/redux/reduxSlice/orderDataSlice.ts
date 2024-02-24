import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { OrderDetails } from "../../interface/orderInterface";

interface initialState {
    ordersData: Array<OrderDetails>
    length: number
}

const initialState: initialState = {
    ordersData: [],
    length: 0,
}


const orderDataSlice: any = createSlice({
    name: 'orders',
    initialState,
    reducers: {
        addOrderReducer: (state, action: PayloadAction<OrderDetails>) => {
            const id = ++state.length
            state.ordersData.push({
                ...action?.payload, ["id"]: id, ["createdAt"]: new Date(), ["orderStatus"]: "placed", ["updatedAt"]: new Date()
            })
        },
        updateOrderReducer: (state, action: PayloadAction<OrderDetails>) => {
            const index = state.ordersData.findIndex(item => item.id === action?.payload?.id)
            if (index !== -1) state.ordersData.splice(index, 1, { ...action?.payload, ['updatedAt']: new Date() })
        },
    },
})

export const { addOrderReducer, updateOrderReducer } = orderDataSlice.actions;

export default orderDataSlice.reducer