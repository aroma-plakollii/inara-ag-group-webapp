import {
    Box,
    Button,
    Container,
    Stack,
    Divider,
    Typography,
    Card,
    SvgIcon
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalPrintshop from '@mui/icons-material/LocalPrintshop';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Layout} from "../../layout/Layout";
import {useGlobalData} from "../../../hooks/useGlobalData";
import {BookingReceiptContent} from "./BookingReceiptContent";
import { useHeaders } from '../../../hooks/useHeaders';
import {bookingGetSingle} from "../../../api/bookingService";
import {Booking} from "../../../types/booking";
import {passengerGetByBooking} from "../../../api/passengerService";
import {Passenger} from "../../../types/passenger";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import {SkeletonHomeTable} from "../../shared/SkeletonHomeTable";
import {BookingDestination, BookingDestinationAdd} from "../../../types/bookingDestination";
import {bookingDestinationGetByBooking} from "../../../api/bookingDestinationService";

export const BookingReceipt = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState<Booking>();
    const [bookingDestination, setBookingDestination] = useState<BookingDestination[]>();
    const [passengers, setPassengers] = useState<Passenger[]>([]);
    const globalData = useGlobalData();
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect( () => {
        const getBooking = async () => {
            const bookingResponse = await bookingGetSingle(Number(bookingId), headers);
            const passengers = await passengerGetByBooking(Number(bookingId), headers);
            const bookingDestinationResponse = await bookingDestinationGetByBooking(Number(bookingId), headers);

            setBooking(bookingResponse);
            setPassengers(passengers);
            setBookingDestination(bookingDestinationResponse);
            setLoading(false);
        }

        getBooking();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mb:8
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        divider={<Divider />}
                        spacing={4}
                    >
                        <Stack spacing={4}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Link to={`/bookings`}>
                                        <Button sx={{border: 'none', color: 'black', fontSize: '15px'}}>
                                            <ArrowBackIcon sx={{mr: 1}}/> Kthehu
                                        </Button>
                                    </Link>
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                >
                                    <Link to={`/bookings/${booking?.idBooking}`}>
                                        <Button
                                            sx={{
                                                mr: '0.5rem',
                                                padding: '8px 17px !important',
                                                color: '#f0d000',
                                                backgroundColor: '#fff4d6',
                                                fontSize: '13px',
                                                borderRadius: '10px'
                                            }}
                                        >
                                            Detajet e rezervimit
                                        </Button>
                                    </Link>
                                    <Button
                                        sx={{
                                            mr: '0.5rem',
                                            padding: '8px 17px !important',
                                            color: 'black',
                                            backgroundColor: '#dddddd',
                                            fontSize: '13px',
                                            borderRadius: '10px'
                                        }}
                                        onClick={handlePrint}
                                    >
                                        <SvgIcon>
                                            <LocalPrintshop sx={{color: 'text.secondary'}} />
                                        </SvgIcon>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        {loading ? (
                            <SkeletonHomeTable />
                        ) : (
                            passengers.length > 0 ? (
                                <Card sx={{ px: 6, height: '63rem', overflowX: 'auto', pt: 3 }}>
                                    <BookingReceiptContent id="printContent" passengers={passengers} booking={booking} global={globalData} bookingDestination={bookingDestination}/>
                                </Card>
                            ) : (
                                <Card sx={{ overflowX: 'auto', p: 3 }}>
                                    <Typography>
                                        Rezervimi nuk ka asnjë pasagjer. Shtoni një <Link to={`/passengers/add/${bookingId}`} style={{color: 'blue'}}>pasagjer</Link>.
                                    </Typography>
                                </Card>
                            )
                        )}
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
}