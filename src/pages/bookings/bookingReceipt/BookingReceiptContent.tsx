import {
    Box,
    Stack,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography
} from '@mui/material';
import dayjs from "dayjs";
import {Booking} from "../../../types/booking";
import {Passenger} from "../../../types/passenger";
import {BookingDestination} from "../../../types/bookingDestination";

interface BookingReceiptContentProps {
    id: any,
    booking: Booking | undefined;
    passengers: Passenger[] | undefined;
    bookingDestination: BookingDestination[] | undefined;
    global: any;
}

export const BookingReceiptContent : React.FC<BookingReceiptContentProps> = (props) => {
    return (
        <Box id={props.id} sx={{height: '90vh', width: '100%', mt: 1, '@media screen and (max-width: 576px)': { width: '160vw' } }}>
            <Box>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid
                        xs={4}
                    >
                        <Typography variant="body2">
                            {/* <b>{props.global.companyDetails.businessNumber}</b> */}
                            {/*<br/>*/}
                            Tel: <b>{props.global.companyDetails.phone}</b>
                            <br/>
                            Adresa: <b>{props.global.companyDetails.address}</b>
                            <br/>
                            Nr: <b>{props.booking?.bookingNumber}</b>
                            <br />
                            Data: <b>{dayjs(props.booking?.date).format('DD.MM.YYYY')}</b>
                        </Typography>
                    </Grid>
                    <Grid
                        xs={4}
                        sx={{display: 'flex', justifyContent: 'center'}}
                    >
                        <div>
                            <Box
                                sx={{
                                display: 'inline-flex',
                                height: 75,
                                width: 75}}
                            >
                                <img
                                    src="/assets/inara-logo-2.png"
                                    alt="Lockup"
                                    style={{width: '10.2rem', height: 'auto', objectFit: 'contain'}}
                                />
                            </Box>
                        </div>
                    </Grid>
                    <Grid
                        xs={4}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: {xs: 'right'},
                            }}
                        >
                            <b>{`${props.booking?.idClient?.firstName} ${props.booking?.idClient?.lastName}`}</b>
                            <br/>
                            {/*Email: <b>{props.booking?.idClient?.email}</b>*/}
                            {/*<br/>*/}
                            Tel: <b>{props.booking?.idClient?.phone}</b>
                            <br/>
                            {/*ID: <b>{props.booking?.idClient?.nationalId}</b>*/}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{mt: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid black', py: 0.5, px: 1.5}}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', width: '28%', alignItems: 'center'}}>
                    <Box>
                        <Typography>Agjensioni:</Typography>
                        <Typography>Nr. fluturimit:</Typography>
                        {props.bookingDestination
                            ?.filter(bookingDestination => bookingDestination.waitingTime !== "") // Filter out non-empty waiting times
                            .map((bookingDestination, index) => (
                                <Typography key={index}>
                                    {`Koha e pritjes ${
                                        (props?.bookingDestination?.filter(bookingDestination => bookingDestination.waitingTime !== "")?.length ?? 0) > 1 ? index + 1 : ''
                                    }: `}
                                </Typography>
                        ))}
                    </Box>
                    <Box>
                        <Typography sx={{fontSize: '14px', lineHeight: '27px'}}>{props.booking?.carrier}</Typography>
                        <Typography sx={{fontSize: '14px', lineHeight: '24px'}}>{props.booking?.flightNumber}</Typography>
                        {props.bookingDestination
                            ?.filter(bookingDestination => bookingDestination.waitingTime !== "") // Filter out non-empty waiting times
                            .map((bookingDestination, index) => (
                                <Typography sx={{fontSize: '14px', lineHeight: '24px'}} key={index}>
                                    {bookingDestination.waitingTime}
                                </Typography>
                            ))}
                    </Box>
                </Box>
                <Box sx={{ width: '25%',}}>
                    {props.bookingDestination?.map((bookingDestination, index) => {
                        return(
                            <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Box>
                                    <Typography>
                                        {`Kohëzgjatja ${(props?.bookingDestination?.length ?? 0) > 1 ? index + 1 : ''}:`}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{fontSize: '14px', lineHeight: '25px'}}>{bookingDestination?.duration}</Typography>
                                </Box>
                            </Box>
                        )
                    })}
                </Box>
            </Box>
            <Box sx={{mt: 2, display: 'flex', justifyContent: 'space-between', border: '1px solid black', py: 0.5, px: 1.5}}>
                {props.bookingDestination?.map((bookingDestination, index, array) => {
                    const isLastItem = index === array.length - 1;
                    return (
                        <>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '20%'}}>
                                <Box>
                                    <Typography>
                                        {bookingDestination?.startDestination}
                                    </Typography>
                                    <Typography sx={{fontSize: '12px'}}>
                                        {dayjs(bookingDestination?.startDateTime).format('DD.MM.YYYY')}
                                    </Typography>
                                    <Typography sx={{fontSize: '12px'}}>
                                        {dayjs(bookingDestination?.startDateTime).format('HH:mm')}h
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography sx={{pb: 1}}> _ </Typography>
                                    <br/>
                                    <br/>
                                </Box>
                                <Box>
                                    <Typography>
                                        {bookingDestination?.endDestination}
                                    </Typography>
                                    <Typography sx={{fontSize: '12px'}}>
                                        {dayjs(bookingDestination?.endDateTime).format('DD.MM.YYYY')}
                                    </Typography>
                                    <Typography sx={{fontSize: '12px'}}>
                                        {dayjs(bookingDestination?.endDateTime).format('HH:mm')}h
                                    </Typography>
                                </Box>
                            </Box>
                            {!isLastItem && <Box sx={{height: '3rem', borderRight: '1px solid black', mt: '14px'}} />}
                        </>
                    )
                })}
            </Box>
            <Table sx={{ mt: 2, border: '1px solid black' }}>
                <TableHead sx={{ border: '1px solid black' }}>
                    <TableRow>
                        <TableCell sx={{py: 1}}>Id</TableCell>
                        <TableCell sx={{py: 1}}>Emri</TableCell>
                        <TableCell sx={{py: 1}}>Nr. i Fluturimit</TableCell>
                        <TableCell sx={{py: 1}}>Klasa</TableCell>
                        <TableCell sx={{py: 1}}>Kilogrami</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.passengers?.map((passenger) => {
                        return(
                            <TableRow sx={{ border: '1px solid black' }}>
                                <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{passenger?.idPassenger}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{`${passenger?.firstName} ${passenger?.lastName}`}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.booking?.flightNumber}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.booking?.flightClass}</TableCell>
                                <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.booking?.weight}kg</TableCell>
                            </TableRow>
                        )
                    })}
                    <TableRow>
                        <TableCell
                            colSpan={5}
                            sx={{ borderBottom: 'none', borderTop: '1px solid black', py: 1}}
                        />
                        <TableCell
                            align="right"
                            sx={{ borderBottom: 'none', borderTop: '1px solid black', py: 1 }}
                        >
                            <Typography variant="subtitle2">
                                <span style={{fontWeight: 700, fontSize: '16px', marginRight: '1rem'}}>Totali:</span>
                                {props.booking?.price}&euro;
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
            <Box>
                <Typography sx={{fontSize: '14px', pt: 1.5, px: 0.5}}>
                    Të gjitha oraret janë lokale. Ju rekomandojmë të arrini në aeroport të paktën 2 orë para
                    nisjes për fluturimet vendase dhe të paktën 3 orë para fluturimeve ndërkombëtare, veçanërisht
                    nëse udhëtoni me bagazh të regjistruar. Mund të kontrolloni edhe rekomandimet zyrtare të aeroportit.
                </Typography>
            </Box>
        </ Box>
    )
}