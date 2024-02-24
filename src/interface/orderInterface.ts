export type StepInterface = "orderNow" | "placeOrder" | "orderStages" | "mainSection"

export interface PlaceOrderInterface {
    type: "veg" | "non-veg",
    size: "small" | "medium" | "large",
    base: "thin" | "thick"
}

export type OrderStages = "placed" | "making" | "ready" | "picked" | "canceled"

export interface OrderDetails extends PlaceOrderInterface {
    id: number
    createdAt: Date
    orderStatus: OrderStages
    updatedAt: Date
}

