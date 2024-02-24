import React, { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { OrderDetails, OrderStages } from '../../../interface/orderInterface';
import { getTimestring, toTitleCase } from '../../../utils/utils';
import { useDispatch } from 'react-redux';
import { updateOrderReducer } from '../../../redux/reduxSlice/orderDataSlice';
import { Chip } from '@mui/material';
import AvTimerIcon from '@mui/icons-material/AvTimer';

interface IProps {
    orderData: OrderDetails
}

const checkNextStage = (currentStage: OrderStages) => {
    if (currentStage === "placed") return "making"
    else if (currentStage === "making") return "ready"
    else if (currentStage === "ready") return "picked"
    else return "canceled"
}


export const OrderCard: React.FC<IProps> = ({ orderData }) => {

    const dispatch = useDispatch()
    const { orderStatus } = orderData
    const [timeTaken, setTimeTaken] = useState({ mins: 0, secs: 0 })


    const updateTimer = () => {
        const timediff = (new Date().valueOf() - orderData.updatedAt.valueOf()) / 1000
        const mins = Math.floor(timediff / 60)
        const sec = Math.floor(timediff - mins * 60)
        setTimeTaken({ ["mins"]: mins, ["secs"]: sec })
    }

    useEffect(() => {
        updateTimer()

        const taskTimer =
            orderData.orderStatus !== "picked"
                ? setInterval(() => {
                    updateTimer()
                }, 5 * 1000) : ""

        return () => clearInterval(taskTimer)
    }, [])


    const isOrderDelay = () => {
        const { orderStatus, size } = orderData
        if (orderStatus === "picked") return false
        const { mins } = timeTaken
        if (mins >= 3) {
            if (orderStatus === "making" && size !== "small") {
                if (size === "large" && mins >= 5) return true
                if (size === "medium" && mins >= 4) return true
                else return false
            }
            else return true
        }
        else return false
    }

    const handleUpdate = (updatedStage: OrderStages) => {
        dispatch(updateOrderReducer({ ...orderData, ["orderStatus"]: updatedStage }))
    }

    return (
        <Card sx={{ backgroundColor: "#ffffffe3", borderRadius: "20px", margin: "20px 5px" }}>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {`Order Id: ${orderData.id}`}
                </Typography>
                <Typography gutterBottom variant="body2" color="text.secondary">
                    {`${toTitleCase(orderData.type)} ${toTitleCase(orderData.size)} ${toTitleCase(orderData.base)}`}
                </Typography>

                <Chip
                    icon={orderData.orderStatus !== "picked" ? <AvTimerIcon /> : undefined}
                    label={orderData.orderStatus === "picked" ? "Picked" : getTimestring(timeTaken.mins, timeTaken.secs)}
                    color={isOrderDelay() ? "error" : undefined}
                />

            </CardContent>
            <CardActions sx={{ justifyContent: "center" }}>
                <Button size="small" disabled={orderStatus === "picked"} variant="text" onClick={() => handleUpdate("canceled")}>Cancel Order</Button>
                <Button size="small" disabled={orderStatus === "picked"} variant="contained" onClick={() => handleUpdate(checkNextStage(orderStatus))}>Next</Button>
            </CardActions>
        </Card>
    );
}

