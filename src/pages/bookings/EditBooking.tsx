import {Link, useNavigate, useParams} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {Booking} from "../../types/booking";
import {BookingForm} from "../../types/bookingForm";
import {useHeaders} from "../../hooks/useHeaders";
import {
    bookingCreate,
    bookingGetByClient, bookingGetByClientPaged,
    bookingGetSingle,
    bookingUpdate,
    getCreateForm,
    getUpdateForm
} from "../../api/bookingService";
import {Layout} from "../layout/Layout";
import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader, Checkbox, Divider,
    FormControl, FormControlLabel, FormGroup,
    MenuItem, Radio, RadioGroup,
    TextField,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {TimePicker} from "@mui/x-date-pickers/TimePicker";
import {Client} from "../../types/client";
import theme from "../../theme/theme";
import {Passenger} from "../../types/passenger";
import {passengerGetByBooking, passengerGetByBookingPaged} from "../../api/passengerService";
import BookingsbyClient from "./BookingsByClient";
import PassengersByBooking from "../passengers/PassengersByBooking";
import { DateTimePicker } from "@mui/x-date-pickers";
import {SkeletonDetails} from "../shared/SkeletonDetails";
import {bookingDestinationGetAll, bookingDestinationGetByBooking} from "../../api/bookingDestinationService";
import {BookingDestination, BookingDestinationAdd} from "../../types/bookingDestination";

export const EditBooking = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<Booking>();
    const [passengers, setPassengers] = useState<Passenger[]>();
    const [bookingDestination, setBookingDestination] = useState<BookingDestinationAdd[]>();
    const [bookingUpdateForm, setBookingUpdateForm] = useState<BookingForm>();
    const [error, setError] = useState<boolean>(false);
    const [deletionUpdate, setDeletionUpdate] = useState<boolean>(false);
    const [errors, setErrors] = useState<any>({
        bookingDate: false,
        flightNumber: false,
        flightClass: false,
        weight: false,
        price: false,
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getBooking = async () =>{
            const booking = await bookingGetSingle(Number(bookingId), headers);
            let data = {page: currentPage}
            const passengersResponse = await passengerGetByBookingPaged(Number(bookingId), data, headers);
            const bookingUpdateFormResponse = await getUpdateForm(headers);
            const bookingDestinationResponse = await bookingDestinationGetByBooking(Number(bookingId), headers);

            setBooking(booking);
            setPassengers(passengersResponse.passengers);
            setTotalPages(passengersResponse.totalPages);
            setBookingDestination(bookingDestinationResponse);
            setBookingUpdateForm(bookingUpdateFormResponse);
            setLoading(false);
        }

        getBooking();
    }, [deletionUpdate]);

    useEffect(() => {
        const calculateDuration = () => {
            if (booking?.departureDateTime && booking?.arrivalDateTime) {
                const departure = dayjs(booking.departureDateTime);
                const arrival = dayjs(booking.arrivalDateTime);
                if (arrival.isAfter(departure)) {
                    const duration = arrival.diff(departure);
                    const durationDayjs = dayjs.duration(duration);
                    const totalHours = (durationDayjs.days() * 24) + durationDayjs.hours();
                    return `${totalHours}h ${durationDayjs.minutes()}m`;
                }
            }
            return "";
        };
        const getBooking = async () =>{
            const duration = calculateDuration();
            if (duration) {
                setBooking(prevBooking => ({
                    ...prevBooking,
                    duration: duration
                }));
            }
        }

        getBooking();
    }, [booking?.departureDateTime, booking?.arrivalDateTime, setBooking]);

    useEffect( () => {
        const calculateReturnDuration = () => {
            if (booking?.returnDepartureDateTime && booking?.returnArrivalDateTime) {
                const departure = dayjs(booking.returnDepartureDateTime);
                const arrival = dayjs(booking.returnArrivalDateTime);
                if (arrival.isAfter(departure)) {
                    const duration = arrival.diff(departure);
                    const durationDayjs = dayjs.duration(duration);
                    const totalHours = (durationDayjs.days() * 24) + durationDayjs.hours();
                    return `${totalHours}h ${durationDayjs.minutes()}m`;
                }
            }
            return "";
        };
        const getCalculation = async () => {
            const duration = calculateReturnDuration();
            if (duration) {
                setBooking(prevBooking => ({
                    ...prevBooking,
                    returnDuration: duration
                }));
            }
        }

        getCalculation();
    }, [booking?.returnDepartureDateTime, booking?.returnArrivalDateTime]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const onDateChange = (val: any, property: string) => {
        setBooking({
            ...booking,
            [property]: val
        });
    };

    const handleArrayChange = ( index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setBookingDestination(bookingDestination =>
            bookingDestination?.map((booking, idx) => {
                if (idx === index) {
                    const updatedbookingDestination = {
                        ...booking,
                        [name]: value,
                        errors: {
                            ...booking.errors,
                            [name]: !value
                        }
                    };
                    return updatedbookingDestination;
                }
                return booking;
            })
        );
    };

    const handleTimeArrayChange = (property: string, index: number, val: any) => {

        setBookingDestination(bookingDestination =>
            bookingDestination?.map((booking, idx) => {
                if (idx === index) {
                    const updatedbookingDestination = {
                        ...booking,
                        [property]: val,
                        // errors: {
                        //     ...booking.errors,
                        //     [name]: !value
                        // }
                    };
                    return updatedbookingDestination;
                }
                return booking;
            })
        );
    };

    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setBooking({
            ...booking,
            [name]: {
                ...(booking && booking[name as keyof Booking] as Record<string, any> || {}),
                [e.target.name]: value,
            },
        });
    };

    const updateDeletion = () => {
        setDeletionUpdate(true);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false);
        setLoading(true);

        if (!booking?.bookingDate || !booking?.flightNumber || !booking?.flightClass || !booking?.weight
            || !booking?.price || !booking?.idClient){

            setErrors({
                bookingDate: !booking?.bookingDate ? true : false,
                flightNumber: !booking?.flightNumber ? true : false,
                flightClass: !booking?.flightClass ? true : false,
                weight: !booking?.weight ? true : false,
                price: !booking?.price ? true : false,
            })
            setLoading(false);
            return;
        }

        try{
            const res = await bookingUpdate(Number(bookingId), booking, headers);

            if(res){
                setLoading(false);
                navigate('/bookings');
            }
        }catch(error) {
            console.error('Booking update failed', error);
        }
    }

    if(loading){
        return (
            <SkeletonDetails />
        )
    }

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    width: '70%',
                    margin: 'auto',
                    '@media screen and (max-width: 576px)': {width: '90%'}
                }}
            >
                <form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Card sx={{pb: 2}}>
                        <CardHeader
                            title="Detajet e Rezervimit"
                        />
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <FormControl sx={{width: '100% !important'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                                    <DatePicker
                                                        label="Data e rezervimit"
                                                        value={dayjs(booking?.bookingDate)}
                                                        onChange={(val) => onDateChange(val, 'bookingDate')}
                                                        format={'DD/MM/YYYY'}
                                                        sx={{width: '100% !important',
                                                            border: errors.departureDateTime ? '1px solid red' : 'none',
                                                            borderRadius: '10px'}}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Agjensioni"
                                            name="carrier"
                                            type='text'
                                            onChange={handleChange}
                                            value={booking?.carrier}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.carrier ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={12}
                                    >
                                        <Box sx={{display: 'flex'}}>
                                            <FormControl sx={{ width: '52%' }}>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={booking?.isRoundTrip ? '1' : '0'}
                                                    name="radio-buttons-group"
                                                    sx={{ display: 'flex', flexDirection: 'row' }}
                                                >
                                                    <FormControlLabel value="0" control={<Radio disabled />} label="Direkt" />
                                                    <FormControlLabel value="1" control={<Radio disabled />} label="Kthim" />
                                                </RadioGroup>
                                            </FormControl>
                                            <FormGroup sx={{ width: '45%' }}>
                                                <FormControlLabel control={<Checkbox defaultChecked={booking?.hasStop} disabled />} label="Ka ndales" />
                                            </FormGroup>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Numri i fluturimit"
                                            name="flightNumber"
                                            type='text'
                                            onChange={handleChange}
                                            value={booking?.flightNumber}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.flightNumber ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            select
                                            error={error}
                                            label="Klasa e fluturimit"
                                            name="flightClass"
                                            onChange={handleChange}
                                            value={booking?.flightClass || ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.flightClass ? true : false,
                                            }}
                                            // defaultValue={booking?.flightClass}
                                        >
                                            <MenuItem
                                                value={'economy'}
                                            >
                                                Economy
                                            </MenuItem >
                                            <MenuItem
                                                value={'business'}
                                            >
                                                Business
                                            </MenuItem >
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Pesha"
                                            name="weight"
                                            type="text"
                                            onChange={handleChange}
                                            value={booking?.weight}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.weight ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Çmimi"
                                            name="price"
                                            onChange={handleChange}
                                            value={booking?.price}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.price ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    {bookingDestination?.map((bookingDestination, index) => (
                                        bookingDestination ? (
                                            <Box width={'100%'} sx={{p: 1, m: 1, border: '1px solid #c7c7c7',
                                                boxShadow: '0px 5px 22px rgb(0 0 0 / 12%), 0px 0px 0px 0.5px rgb(0 0 0 / 8%)', borderRadius: '7px'}}>
                                                <Grid container spacing={3}>
                                                    <Grid xs={12} md={6}>
                                                        <FormControl sx={{ width: '100% !important' }}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['DatePicker']} sx={{ width: '100% !important', paddingTop: '0 !important' }}>
                                                                    <DateTimePicker
                                                                        label="Data e Nisjes"
                                                                        value={dayjs(bookingDestination.startDateTime)}
                                                                        onChange={(val) => handleTimeArrayChange('startDateTime', index, val)}
                                                                        ampm={false}
                                                                        format="DD/MM/YYYY HH:mm"
                                                                        sx={{
                                                                            width: '100% !important',
                                                                            border: bookingDestination.errors?.startDateTime ? '1px solid red' : 'none',
                                                                            borderRadius: '10px',
                                                                            '& .Mui-error': {borderColor: '#c7c7c7', boxShadow: 'none', color: '#6c737f'}
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <FormControl sx={{ width: '100% !important' }}>
                                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                                <DemoContainer components={['DatePicker']} sx={{ width: '100% !important', paddingTop: '0 !important' }}>
                                                                    <DateTimePicker
                                                                        label="Data e Arritjes"
                                                                        value={dayjs(bookingDestination.endDateTime)}
                                                                        onChange={(val) => handleTimeArrayChange('endDateTime', index, val)}
                                                                        ampm={false}
                                                                        format="DD/MM/YYYY HH:mm"
                                                                        sx={{
                                                                            width: '100% !important',
                                                                            border: bookingDestination.errors?.endDateTime ? '1px solid red' : 'none',
                                                                            borderRadius: '10px',
                                                                            '& .Mui-error': {borderColor: '#c7c7c7', boxShadow: 'none', color: '#6c737f'}
                                                                        }}
                                                                    />
                                                                </DemoContainer>
                                                            </LocalizationProvider>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextField
                                                            fullWidth
                                                            error={bookingDestination.errors?.startDestination}
                                                            label="Aeroporti i nisjes"
                                                            name="startDestination"
                                                            type='text'
                                                            onChange={(e) => handleArrayChange(index, e)}
                                                            value={bookingDestination.startDestination}
                                                            variant="outlined"
                                                            InputLabelProps={{
                                                                shrink: bookingDestination.startDestination ? true : false,
                                                            }}
                                                        />
                                                    </Grid>
                                                    <Grid xs={12} md={6}>
                                                        <TextField
                                                            fullWidth
                                                            error={bookingDestination.errors?.endDestination}
                                                            label="Aeroporti i arritjes"
                                                            name="endDestination"
                                                            type='text'
                                                            onChange={(e) => handleArrayChange(index, e)}
                                                            value={bookingDestination.endDestination}
                                                            variant="outlined"
                                                            InputLabelProps={{
                                                                shrink: bookingDestination.endDestination ? true : false,
                                                            }}
                                                        />
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        ) : null
                                    ))}
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/bookings`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            <Button variant="contained" type="submit" onClick={handleSubmit}>
                               Ruaj
                            </Button>
                        </CardActions>
                    </Card>
                </form>
                <PassengersByBooking
                    updateDeletion={updateDeletion}
                    passengers={passengers}
                    bookingId={bookingId}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}/>
            </Box>
        </Layout>
    )
}