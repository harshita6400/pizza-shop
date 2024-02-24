import { useEffect, useState } from "react"
import { OrderDetails } from "../../interface/orderInterface"
import { StyledComponent } from "@emotion/styled"
import { Button, TableCellProps, TableRowOwnProps } from "@mui/material"
import { useDispatch } from "react-redux"
import { updateOrderReducer } from "../../redux/reduxSlice/orderDataSlice"
import { getTimestring, toTitleCase } from "../../utils/utils"


interface IProps {
    data: OrderDetails
    StyledTableCell: StyledComponent<TableCellProps>
    StyledTableRow: StyledComponent<TableRowOwnProps>
}

export const TableDataComponent: React.FC<IProps> = ({ data, StyledTableCell, StyledTableRow }) => {
    const dispatch = useDispatch()
    const [timeTaken, setTimeTaken] = useState({ mins: 0, secs: 0 })

    const isPickedOrCanceled = (data.orderStatus === "picked" || data.orderStatus === "canceled")

    const updateTimer = () => {
        const timediff = (new Date().valueOf() - data.createdAt.valueOf()) / 1000
        const mins = Math.floor(timediff / 60)
        const sec = Math.floor(timediff - mins * 60)
        setTimeTaken({ ["mins"]: mins, ["secs"]: sec })
    }

    useEffect(() => {
        isPickedOrCanceled
            ? (() => {
                const timediff = (data.updatedAt.valueOf() - data.createdAt.valueOf()) / 1000
                const mins = Math.floor(timediff / 60)
                const sec = Math.floor(timediff - mins * 60)
                setTimeTaken({ ["mins"]: mins, ["secs"]: sec })
            })()
            : updateTimer()

    }, [])

    useEffect(() => {

        const taskTimer =
            !isPickedOrCanceled
                ? setInterval(() => {
                    updateTimer()
                }, 5 * 1000)
                : ""

        return () => clearInterval(taskTimer)
    }, [])



    const handleCancel = () => {
        dispatch(updateOrderReducer({ ...data, ["orderStatus"]: "canceled" }))
    }


    return (
        <>
            <StyledTableRow>
                <StyledTableCell sx={{ textAlign: "center" }}>{data.id}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>{toTitleCase(data.orderStatus)}</StyledTableCell>
                <StyledTableCell sx={{ textAlign: "center" }}>
                    {`${data.orderStatus === "picked" ? "Picked in" : data.orderStatus === "canceled" ? "Canceled in" : ""} ${getTimestring(timeTaken.mins, timeTaken.secs)}`}
                </StyledTableCell>
                <StyledTableCell>
                    <Button size="small" disabled={isPickedOrCanceled} variant="contained" onClick={handleCancel}>Cancel</Button>
                </StyledTableCell>
            </StyledTableRow>
        </>
    )
}