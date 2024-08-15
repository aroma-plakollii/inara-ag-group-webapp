import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
import {Layout} from "../layout/Layout";
import {
    Box,
    Button,
    Card, CardActions,
    CardHeader,
    Container,
    Stack,
    Table, TableBody, TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import Pagination from "@mui/material/Pagination";
import {Link} from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from "dayjs";
import {userType} from "../../api/authService";
import theme from "../../theme/theme";
import {BookingForm} from "../../types/bookingForm";
import {bookingDelete, bookingGetAll, bookingGetAllPaged, getCreateForm} from "../../api/bookingService";
import {setBookings} from "../../features/bookings/bookingSlice";
import {Booking} from "../../types/booking";
import {clientDelete} from "../../api/clientService";
import AlertConfirm from "../shared/AlertConfirm";
import {SkeletonTableWithButton} from "../shared/SkeletonTableWithButton";
import {SkeletonTable} from "../shared/SkeletonTable";
import {BookingDestination} from "../../types/bookingDestination";
import {bookingDestinationGetAll, bookingDestinationGetByBooking} from "../../api/bookingDestinationService";

const Bookings = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user );
    const bookings = useSelector((state: RootState) => state.bookings);
    const [bookingCreateForm, setBookingCreateForm] = useState<BookingForm>();
    const [bookingDestination, setBookingDestination] = useState<BookingDestination[]>();
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [bookingId, setBookingId]= useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getBookings = async () => {
            const bookingsResponse: any = await bookingGetAllPaged(currentPage, headers);
            const bookingCreateFormResponse = await getCreateForm(headers);
            const bookingDestinationResponse = await bookingDestinationGetAll(headers);

            if(bookingsResponse)
                dispatch(setBookings(bookingsResponse.bookings as Booking[]));

            setTotalPages(bookingsResponse.totalPages);
            setBookingDestination(bookingDestinationResponse.bookingDestinations);
            setBookingCreateForm(bookingCreateFormResponse);
            setLoading(false);
        }

        getBookings();
    }, [dispatch, isDeleted, currentPage]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setBookingId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await bookingDelete(bookingId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setBookingId(0);
                setLoading(true);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setBookingId(0);
        }
    }

    if(loading){
        return (
            <SkeletonTable />
        )
    }

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="xl">
                    <Stack spacing={3}>
                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Rezervimet"
                            />
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
                                                <TableCell sx={{width: '13%'}}>
                                                    Nr. i rezervimit
                                                </TableCell>
                                                <TableCell sx={{width: '13%'}}>
                                                    Nr. i fluturimit
                                                </TableCell>
                                                <TableCell sx={{width: '20%'}}>
                                                    Nisja/Arritja
                                                </TableCell>
                                                <TableCell>
                                                    Klienti
                                                </TableCell>
                                                <TableCell>
                                                    Çmimi
                                                </TableCell>
                                                <TableCell align="right">

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bookings.map((booking) => {
                                                const bookingDestinationByBooking = bookingDestination?.filter((bookingDestination) => bookingDestination.idBooking.idBooking === booking.idBooking);
                                                const client = bookingCreateForm?.clients.find((client) => client.idClient === booking.idClient?.idClient);
                                                const formattedMonth = booking.bookingDate ? dayjs(booking.bookingDate).format('MMM') : '';
                                                const formattedDay = booking.bookingDate ? dayjs(booking.bookingDate).format('DD') : '';
                                                const formattedYear = booking.bookingDate ? dayjs(booking.bookingDate).format('YYYY') : '';
                                                console.log(bookingDestinationByBooking)

                                                return (
                                                    <TableRow
                                                        hover
                                                        key={booking.idBooking}
                                                    >
                                                        <TableCell
                                                            sx={{pl :  booking.type === 'return' ? '0' : '1rem'}}
                                                        >
                                                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                                                {booking.type === 'return' &&
                                                                    <Box sx={{
                                                                        height: '7rem',
                                                                        borderLeft: '4px solid #ffdd00',
                                                                    }} />
                                                                }
                                                                {booking.idBooking}
                                                            </Box>
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
                                                            <Box>
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
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Link to={`/clients/${client?.idClient}`} style={{color: 'black'}}>
                                                                    {`${client?.firstName} ${client?.lastName}`}
                                                            </Link>
                                                        </TableCell>
                                                        <TableCell>
                                                            {`${booking.price}€`}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Link to={`/bookings/receipt/${booking.idBooking}`}>
                                                                    <Button
                                                                        sx={{
                                                                            mr: '0.5rem',
                                                                            padding: '3px 14px !important',
                                                                            color: 'black',
                                                                            backgroundColor: '#dddddd',
                                                                            fontSize: '13px',
                                                                            borderRadius: '15px'
                                                                        }}
                                                                    >
                                                                        <ReceiptLongIcon />
                                                                    </Button>
                                                                </Link>
                                                                <Link to={`/bookings/${booking.idBooking}`}>
                                                                    <Button
                                                                        sx={{
                                                                            mr: '0.5rem',
                                                                            padding: '3px 14px !important',
                                                                            color: theme.palette.primary.dark,
                                                                            backgroundColor: '#fff4d6',
                                                                            fontSize: '13px',
                                                                            borderRadius: '15px'
                                                                        }}
                                                                    >
                                                                        <EditIcon />
                                                                    </Button>
                                                                </Link>
                                                                {user?.userRole === 'SUPERADMIN' && (
                                                                    <Button
                                                                        sx={{
                                                                            padding: '5px 1px !important',
                                                                            color: theme.palette.error.dark,
                                                                            backgroundColor: '#ffdad7',
                                                                            fontSize: '13px',
                                                                            borderRadius: '15px'
                                                                        }}
                                                                        onClick={() => onDelete(booking.idBooking)}
                                                                    >
                                                                        <DeleteIcon />
                                                                    </Button>
                                                                )}
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TableContainer>
                            {totalPages > 1 &&
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(event, page) => {
                                    setCurrentPage(page);
                                    setLoading(true);
                                }}
                                sx={{ '& .MuiPagination-ul' : {
                                        display: 'flex',
                                        width: '80%',
                                        margin: '1rem auto 0 auto',
                                        justifyContent: 'center'
                                    }}}
                            />}
                        </Card>
                    </Stack>
                </Container>
                {alertOpen && <AlertConfirm
                    title={'Jeni duke fshirë rezervimin'}
                    message={'Jeni i sigurt që dëshironi të fshini rezervimin?'}
                    isOpen={alertOpen}
                    onClose={onCloseAlert}
                />}
            </Box>
        </Layout>
    );
}

export default Bookings;