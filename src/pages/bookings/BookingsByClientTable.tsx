import {
    Box,
    Button, Card, CardActions,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {Dispatch, SetStateAction} from "react";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import theme from "../../theme/theme";
import {Booking} from "../../types/booking";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import EditIcon from "@mui/icons-material/Edit";
import {BookingDestination} from "../../types/bookingDestination";

interface BookingsByClientTableProps {
    bookings: Booking[] | undefined;
    bookingDestinations: BookingDestination[] | undefined;

    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const BookingsByClientTable : React.FC<BookingsByClientTableProps> = (props) => {
    return(
        <Card sx={{pb: 2}}>
            <CardHeader
                title="Rezervimet"
            />
            {props.bookings && props.bookings?.length > 0 ? (
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Box sx={{minWidth: 800}}>
                        <Table>
                            <TableHead sx={{background: '#f8f9fa'}}>
                                <TableRow>
                                    <TableCell>
                                        Id
                                    </TableCell>
                                    <TableCell>
                                        Data e rezervimit
                                    </TableCell>
                                    <TableCell>
                                        Numri i rezervimit
                                    </TableCell>
                                    <TableCell sx={{width: '8%'}}>
                                        Numri i fluturimit
                                    </TableCell>
                                    <TableCell sx={{width: '28%'}}>
                                        Nisja/Arritja
                                    </TableCell>
                                    <TableCell sx={{width: '8%'}}>
                                        Çmimi
                                    </TableCell>
                                    <TableCell align="right" sx={{width: '25%'}}>

                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {props.bookings?.map((booking) => {
                                    const bookingDestinationByBooking = props.bookingDestinations?.filter((bookingDestination) => bookingDestination.idBooking.idBooking === booking.idBooking);
                                    const formattedMonth = booking.bookingDate ? dayjs(booking.bookingDate).format('MMM') : '';
                                    const formattedDay = booking.bookingDate ? dayjs(booking.bookingDate).format('DD') : '';
                                    const formattedYear = booking.bookingDate ? dayjs(booking.bookingDate).format('YYYY') : '';

                                    return (
                                        <TableRow
                                            hover
                                        >
                                            <TableCell>
                                                {booking.idBooking}
                                            </TableCell>
                                            <TableCell>
                                                <Box
                                                    sx={{
                                                        p: '5px 10px',
                                                        backgroundColor: '#e7eaed',
                                                        borderRadius: 2,
                                                        maxWidth: 'fit-content',
                                                        display: "flex",
                                                        alignItems: "center",
                                                        flexDirection: "column"
                                                    }}
                                                >
                                                    <Typography
                                                        color="text.primary"
                                                        variant="caption"
                                                        sx={{textTransform: 'uppercase', fontSize: '15px'}}
                                                    >
                                                        {formattedMonth}
                                                    </Typography>
                                                    <Typography
                                                        color="text.primary"
                                                        variant="h6"
                                                    >
                                                        {formattedDay}
                                                    </Typography>
                                                    <Typography
                                                        color="text.primary"
                                                        variant="caption"
                                                        sx={{textTransform: 'uppercase', fontSize: '11px'}}
                                                    >
                                                        {formattedYear}
                                                    </Typography>
                                                </Box>
                                            </TableCell>
                                            <TableCell>
                                                {booking.bookingNumber}
                                            </TableCell>
                                            <TableCell>
                                                {booking.flightNumber}
                                            </TableCell>
                                            <TableCell>
                                                {bookingDestinationByBooking?.map((bookingDestinationByBooking) =>{
                                                    return (
                                                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '98%'}}>
                                                            <Box>
                                                                <Typography sx={{fontSize: '14px', lineHeight: '24px'}}>
                                                                    {bookingDestinationByBooking?.startDestination}
                                                                </Typography>
                                                                <Typography sx={{fontSize: '12px'}}>
                                                                    {dayjs(bookingDestinationByBooking?.startDateTime).format('DD.MM.YYYY')}
                                                                </Typography>
                                                                <Typography sx={{fontSize: '12px'}}>
                                                                    {dayjs(bookingDestinationByBooking?.startDateTime).format('HH:mm')}h
                                                                </Typography>
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{pb: 1}}> _ </Typography>
                                                                <br/>
                                                                <br/>
                                                            </Box>
                                                            <Box>
                                                                <Typography sx={{fontSize: '14px', lineHeight: '24px'}}>
                                                                    {bookingDestinationByBooking?.endDestination}
                                                                </Typography>
                                                                <Typography sx={{fontSize: '12px'}}>
                                                                    {dayjs(bookingDestinationByBooking?.endDateTime).format('DD.MM.YYYY')}
                                                                </Typography>
                                                                <Typography sx={{fontSize: '12px'}}>
                                                                    {dayjs(bookingDestinationByBooking?.endDateTime).format('HH:mm')}h
                                                                </Typography>
                                                            </Box>
                                                        </Box>
                                                    )
                                                })}
                                            </TableCell>
                                            <TableCell>
                                                {`${booking.price}€`}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link to={`/bookings/${booking.idBooking}`}>
                                                    <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                        backgroundColor: '#fff4d6', fontSize: '13px', borderRadius: '15px' }}>
                                                        <EditIcon />
                                                    </Button>
                                                </Link>
                                                <Link to={`/bookings/receipt/${booking.idBooking}`}>
                                                    <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: 'black',
                                                        backgroundColor: '#dddddd', fontSize: '13px', borderRadius: '15px' }}>
                                                        <ReceiptLongIcon />
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </Box>
                    {props.totalPages > 1 &&
                    <Pagination
                        count={props.totalPages}
                        page={props.currentPage}
                        onChange={(event, page) => {
                            props.setCurrentPage(page);
                        }}
                        sx={{
                            '& .MuiPagination-ul': {
                                display: 'flex',
                                width: '80%',
                                margin: '1rem auto 0 auto',
                                justifyContent: 'center'
                            }
                        }}
                    />}
                </TableContainer>
            ) : <Typography px={3}>Klienti nuk ka asnjë rezervim</Typography>}
        </Card>
    )
}