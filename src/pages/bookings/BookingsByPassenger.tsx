import {Layout} from "../layout/Layout";
import {
    Box,
    Container,
    Stack,
    Button,
    FormControl, Card, CardHeader, TableContainer, Table, TableBody, TableRow, TableCell, Typography, CardActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import { useHeaders } from "../../hooks/useHeaders";
import {BookingsByClientTable} from "./BookingsByClientTable";
import {Passenger} from "../../types/passenger";
import {passengerGetSingle} from "../../api/passengerService";
import {PassengerTable} from "./PassengerTable";
import dayjs from "dayjs";
import theme from "../../theme/theme";

export const BookingsbyPassenger = () => {
    const { passengerId } = useParams();
    const [passenger, setPassenger] = useState<Passenger>();
    const headers = useHeaders();

    useEffect(() => {
        const getPassenger= async () =>{
            const passenger = await passengerGetSingle(Number(passengerId), headers);
            setPassenger(passenger);
        }

        getPassenger();
    }, [])

    const formattedMonth = passenger?.idBooking?.bookingDate ? dayjs(passenger?.idBooking.bookingDate).format('MMM') : '';
    const formattedDay = passenger?.idBooking?.bookingDate ? dayjs(passenger?.idBooking.bookingDate).format('DD') : '';

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
                        <PassengerTable passenger={passenger} />

                        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                            <Link to={'/bookings/add'}>
                                <Button
                                    startIcon={(
                                        <AddIcon />
                                    )}
                                    variant="contained"
                                >
                                    Shto
                                </Button>
                            </Link>
                        </Box>

                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Rezervimet"
                            />
                                <TableContainer sx={{ overflowX: 'auto' }}>
                                    <Box sx={{minWidth: 800}}>
                                        <Table>
                                            <TableBody>
                                                <TableRow
                                                    hover
                                                >
                                                    <TableCell sx={{mt: 1}}>
                                                        <Box
                                                            sx={{
                                                                p: '5px 10px',
                                                                backgroundColor: '#e7eaed',
                                                                borderRadius: 2,
                                                                maxWidth: 'fit-content',
                                                            }}
                                                        >
                                                            <Typography
                                                                align="center"
                                                                color="text.primary"
                                                                variant="caption"
                                                                sx={{textTransform: 'uppercase', fontSize: '15px'}}
                                                            >
                                                                {formattedMonth}
                                                            </Typography>
                                                            <Typography
                                                                align="center"
                                                                color="text.primary"
                                                                variant="h6"
                                                            >
                                                                {formattedDay}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={{mt: 1}}>
                                                        {passenger?.idBooking?.bookingNumber}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Link to={`/bookings/${passenger?.idBooking}`}>
                                                            <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                                backgroundColor: '#fff4d6', fontSize: '13px', borderRadius: '15px' }}>
                                                                DETAJET
                                                            </Button>
                                                        </Link>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Box>
                                    <CardActions />
                                </TableContainer>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default BookingsbyPassenger;