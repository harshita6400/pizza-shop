import { Box, Divider, Grid } from "@mui/material"
import { useMemo } from "react"
import { OrderDetails } from "../../interface/orderInterface"
import { OrderCard } from "./orderCard/OrderCard"

interface IProps {
    orders: Array<OrderDetails>
}

export const OrderStages: React.FC<IProps> = ({ orders }) => {

    const orderPlacedData = useMemo(() => orders.filter(item => item.orderStatus === "placed").sort(function (a, b) { return a.updatedAt.valueOf() - b.updatedAt.valueOf() }), [orders])
    const orderMakingData = useMemo(() => orders.filter(item => item.orderStatus === "making").sort(function (a, b) { return a.updatedAt.valueOf() - b.updatedAt.valueOf() }), [orders])
    const orderReadyData = useMemo(() => orders.filter(item => item.orderStatus === "ready").sort(function (a, b) { return a.updatedAt.valueOf() - b.updatedAt.valueOf() }), [orders])
    const orderPickedData = useMemo(() => orders.filter(item => item.orderStatus === "picked"), [orders])


    const orderStagesColumn = [
        { name: "Order Placed", state: orderPlacedData },
        { name: "Order in Making", state: orderMakingData },
        { name: "Order Ready", state: orderReadyData },
        { name: "Order Picked", state: orderPickedData }
    ]


    return (
        <>
            <div className="order-stages">
                <h1>Order Stages</h1>
                <Grid container spacing={2} className="order-grid">
                    {
                        orderStagesColumn?.map((item, index) => (
                            <Grid item xs={3} key={index}>
                                <Box component="section" sx={{ p: 2, borderRadius: "15px", backgroundColor: "#80808024", margin: "5px" }}>
                                    <h5>{item.name}</h5>
                                    <Divider />
                                    {
                                        item.state?.map((cardItem) => (
                                            <OrderCard
                                                key={cardItem.id}
                                                orderData={cardItem}
                                            />
                                        ))
                                    }
                                </Box>
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        </>
    )
}