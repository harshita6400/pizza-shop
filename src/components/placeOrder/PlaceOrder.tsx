import { Alert, Grid, Snackbar, Typography } from "@mui/material"
import React, { ChangeEvent, useMemo, useState } from "react"
import { OrderDetails, PlaceOrderInterface, StepInterface } from "../../interface/orderInterface";
import { useDispatch } from "react-redux";
import { addOrderReducer } from "../../redux/reduxSlice/orderDataSlice";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { OrderForm } from "./OrderForm";

const handleStep = (step: number, value: PlaceOrderInterface, handleChange: (e: ChangeEvent<HTMLInputElement>) => void, handleStepChange: (stepChange: "next" | "prev") => void) => {
    switch (step) {
        case 0:
            return (
                <Typography gutterBottom variant="h5" sx={{ fontFamily: "Great Vibes" }} color="text.secondary">
                    Not taking any orders for now... <br /> Please try after some time
                </Typography>
            )
        case 1:
            return (
                <OrderForm
                    step={step}
                    formLabel="Please select which one you want?"
                    name="type"
                    values={["veg", "non-veg"]}
                    value={value}
                    handleChange={handleChange}
                    handleStepChange={handleStepChange}
                />
            );
        case 2:
            return (
                <OrderForm
                    step={step}
                    formLabel="Please select which size you prefer?"
                    name="size"
                    values={["small", "medium", "large"]}
                    value={value}
                    handleChange={handleChange}
                    handleStepChange={handleStepChange}
                />
            );
        case 3:
            return (
                <OrderForm
                    step={step}
                    formLabel="Please select which base you prefer?"
                    name="base"
                    values={["thin", "thick"]}
                    value={value}
                    handleChange={handleChange}
                    handleStepChange={handleStepChange}
                />
            );
        case 4:
            return (
                <Typography gutterBottom variant="h1" sx={{ fontFamily: "Great Vibes" }} color="primary">
                    Thank You
                </Typography>
            )
        default:
            return (<></>);
    }
};

interface IProps {
    handlePageStepChange: (newStep: StepInterface) => void
    orders: Array<OrderDetails>
}
export const PlaceOrder: React.FC<IProps> = ({ handlePageStepChange, orders }) => {
    const dispatch = useDispatch()
    const activeOrders = useMemo(() => orders.reduce((acc, item) => acc + Number(item.orderStatus !== "picked" && item.orderStatus !== "canceled"), 0), [orders])

    const [orderForm, setOrderForm] = useState<PlaceOrderInterface>({
        type: "veg",
        size: "medium",
        base: "thin"
    })
    const [step, setStep] = useState(activeOrders >= 10 ? 0 : 1)
    const [openSnackBar, setOpenSnackBar] = useState(false)



    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setOrderForm({ ...orderForm, [name]: value })
    }

    const handleSubmit = () => {
        dispatch(addOrderReducer(orderForm))
        setOpenSnackBar(true)
        setStep(4)
        setTimeout(() => {
            handlePageStepChange("orderNow")
            setOpenSnackBar(false)
        }, 2 * 1000);
    }

    const handleStepChange = (stepChange: "next" | "prev") => {
        if (step === 3 && stepChange === "next") handleSubmit()
        else if (stepChange === "next") setStep(step + 1)
        else setStep(step - 1)
    }

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <div className="place-order">
                        <h1><ArrowBackIcon onClick={() => handlePageStepChange("orderNow")} /> Place Order</h1>
                        {handleStep(step, orderForm, handleChange, handleStepChange)}
                    </div>

                </Grid>
            </Grid>
            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={openSnackBar}
            >
                <Alert severity="success">Your order is placed successfully.</Alert>

            </Snackbar>
        </>
    )
}
