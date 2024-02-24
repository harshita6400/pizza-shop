import React, { useState } from "react"
import { MainSection, OrderStages, PlaceOrder } from "../../components"
import { Button, Grid, SpeedDial, SpeedDialAction, SpeedDialIcon, ThemeProvider, createTheme } from "@mui/material";
import { useSelector } from "react-redux";
import { OrderDetails, StepInterface } from "../../interface/orderInterface";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import ViewListOutlinedIcon from '@mui/icons-material/ViewListOutlined';
import "./landingPage.css"

const theme = createTheme({
    palette: {
        primary: {
            main: '#df6255',
        },
    },
});


const handleStep = (step: StepInterface, handleStepChange: (newStep: StepInterface) => void, orders: Array<OrderDetails>) => {
    switch (step) {
        case "orderNow":
            return <OrderNow
                handlePageStepChange={handleStepChange}
            />

        case "placeOrder":
            return <PlaceOrder
                handlePageStepChange={handleStepChange}
                orders={orders}
            />

        case "orderStages":
            return <OrderStages
                orders={orders}
            />
        case "mainSection":
            return <MainSection
                orders={orders}
            />
        default:
            return (<></>);
    }
};


export const LandingPage: React.FC = () => {
    const [step, setStep] = useState<StepInterface>("orderNow")

    const orders: Array<OrderDetails> = useSelector((item: any) => item.orderDataSlice.ordersData)


    const handleStepChange = (newStep: StepInterface) => setStep(newStep)


    const actions = [
        { icon: <HomeOutlinedIcon />, name: 'Main Page', action: "orderNow" },
        { icon: <FoodBankIcon />, name: 'Place Order', action: "placeOrder" },
        { icon: <TableChartOutlinedIcon />, name: 'Pizza Stages', action: "orderStages" },
        { icon: <ViewListOutlinedIcon />, name: 'Main Table', action: "mainSection" },
    ];


    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="app-banner">

                    {handleStep(step, handleStepChange, orders)}

                </div>

                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 70, right: 100 }}
                    icon={<SpeedDialIcon />}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            tooltipOpen
                            onClick={() => handleStepChange(action.action as StepInterface)}
                        />
                    ))}
                </SpeedDial>

            </ThemeProvider>
        </>
    )
}

interface OrderProps {
    handlePageStepChange: (newStep: StepInterface) => void
}

export const OrderNow: React.FC<OrderProps> = ({ handlePageStepChange }) => {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={6}></Grid>
                <Grid item xs={6}>
                    <div className="banner-text">
                        <h1>Delecious</h1>
                        <h2>Testiest Pizza on Planet</h2>
                        <h3>Best Crust Best Topings</h3>
                        <Button size="small" variant="contained" onClick={() => handlePageStepChange("placeOrder")}>Place Order</Button>
                    </div>
                </Grid>
            </Grid>
        </>
    )
}