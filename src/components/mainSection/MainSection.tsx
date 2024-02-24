import React, { useMemo, useState } from "react"
import { OrderDetails } from "../../interface/orderInterface"
import { Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TablePagination, TableRow, createMuiTheme, styled, tableCellClasses } from "@mui/material"
import { TableDataComponent } from "./TableData";
import { paginateRows } from "../../utils/utils";



const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
    [`&.${tableCellClasses.footer}`]: {
        backgroundColor: "#bdbdbd",
        color: theme.palette.common.black,
        fontSize: 14,
    }
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    }
}));


interface IProps {
    orders: Array<OrderDetails>
}

export const MainSection: React.FC<IProps> = ({ orders }) => {

    const [activePage, setActivePage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const pickedOrders = useMemo(() => { return orders.reduce((acc, item) => { return acc + Number(item.orderStatus === "picked") }, 0) }, [orders])

    const paginatedRows: OrderDetails[] = paginateRows(orders, activePage, rowsPerPage)

    const handleChangePage = (event: unknown, newPage: number) => setActivePage(newPage);

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setActivePage(0);
    };


    return (
        <>
            <div className="order-stages">

                <h1>Main Section</h1>
                <div className="order-grid">
                    <TableContainer sx={{ opacity: 0.8 }} component={Paper}>
                        <Table aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell sx={{ textAlign: "center" }}>Order Id</StyledTableCell>
                                    <StyledTableCell sx={{ textAlign: "center" }}>Stage</StyledTableCell>
                                    <StyledTableCell sx={{ textAlign: "center" }}>Total time spent(time from order placed)</StyledTableCell>
                                    <StyledTableCell>Actions</StyledTableCell>
                                </TableRow>
                            </TableHead>


                            <TableBody>
                                {
                                    paginatedRows?.map(item => (
                                        <TableDataComponent
                                            key={item.id}
                                            data={item}
                                            StyledTableCell={StyledTableCell}
                                            StyledTableRow={StyledTableRow}
                                        />
                                    ))
                                }
                            </TableBody>

                            <TableFooter>
                                <StyledTableRow>
                                    <StyledTableCell colSpan={4}>Total Number of order delivered is {pickedOrders}</StyledTableCell>
                                </StyledTableRow>
                            </TableFooter>

                        </Table>
                    </TableContainer>

                    {
                        orders?.length
                            ? <>
                                <TablePagination
                                    sx={{ borderLeft: "2px solid #ffffff8a" }}
                                    rowsPerPageOptions={[5, 10, 15]}
                                    component="div"
                                    count={orders.length}
                                    rowsPerPage={rowsPerPage}
                                    page={activePage}
                                    onPageChange={handleChangePage}
                                    onRowsPerPageChange={handleChangeRowsPerPage}
                                />
                            </>
                            : <>No Orders</>
                    }
                </div>
            </div>
        </>
    )
}