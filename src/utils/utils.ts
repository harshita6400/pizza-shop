import { OrderDetails } from "../interface/orderInterface"

export const toTitleCase = (word: string) => word.charAt(0).toLocaleUpperCase() + word.slice(1)

export function paginateRows(orders: Array<OrderDetails>, activePage: number, rowsPerPage: number) {
    return [...orders].slice(activePage * rowsPerPage, (activePage + 1) * rowsPerPage)
}

export const getTimestring = (mins: number, secs: number) => {
    if (mins) return `${mins} ${mins > 1 ? "mins" : "min"} ${secs} sec`
    else return `${secs} sec`
}
