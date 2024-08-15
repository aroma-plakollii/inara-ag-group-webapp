import {Link, useNavigate, useParams} from "react-router-dom";
import React, {ChangeEvent, useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
import {Layout} from "../layout/Layout";
import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader, Checkbox, Divider,
    FormControl, FormControlLabel, FormGroup,
    MenuItem, Radio, RadioGroup, TableCell, TableRow,
    TextField,
    Unstable_Grid2 as Grid
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from "dayjs";
import theme from "../../theme/theme";
import {Booking} from "../../types/booking";
import {BookingForm} from "../../types/bookingForm";
import {bookingCreate, getCreateForm} from "../../api/bookingService";
import {clientGetSingle} from "../../api/clientService";
import { DateTimePicker } from "@mui/x-date-pickers";
import duration from 'dayjs/plugin/duration';
import {BookingDestination, BookingDestinationAdd} from "../../types/bookingDestination";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {clientInvoiceCreateAll} from "../../api/ClientInvoiceService";
import {bookingDestinationCreateAll} from "../../api/bookingDestinationService";
dayjs.extend(duration);

const calculateDuration = (startDateTime: any, endDateTime: any) => {
    if (startDateTime && endDateTime) {
        const departure = dayjs(startDateTime);
        const arrival = dayjs(endDateTime);
        if (arrival.isAfter(departure)) {
            const duration = arrival.diff(departure);
            const durationDayjs = dayjs.duration(duration);
            const totalHours = (durationDayjs.days() * 24) + durationDayjs.hours();
            return `${totalHours}h ${durationDayjs.minutes()}m`;
        }
    }
    return "";
};

const calculateWaitingTime = (endDateTime: any, nextStartDateTime: any) => {
    if (endDateTime && nextStartDateTime) {
        const end = dayjs(endDateTime);
        const start = dayjs(nextStartDateTime);
        if (start.isAfter(end)) {
            const diff = start.diff(end);
            const durationDayjs = dayjs.duration(diff);
            const totalHours = (durationDayjs.days() * 24) + durationDayjs.hours();
            return { totalHours, waitingTime: `${totalHours}h ${durationDayjs.minutes()}m` };
        }
    }
    return { totalHours: 0, waitingTime: "" };
};

export const AddBookingByClient = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [booking, setBooking] = useState<Booking>();
    const [bookingDestination, setBookingDestination] = useState<BookingDestinationAdd[]>([{
        startDestination: "",
        endDestination: "",
        startDateTime: "",
        endDateTime: "",
        duration: "",
        waitingTime: "",
        idBooking: {} as Booking,
        errors: {
            startDestination: false,
            endDestination: false,
            startDateTime: false,
            endDateTime: false,
        }
    }]);
    const [bookingCreateForm, setBookingCreateForm] = useState<BookingForm>();
    const [errors, setErrors] = useState<any>({
        bookingDate: false,
        flightNumber: false,
        flightClass: false,
        weight: false,
        price: false,
        startDate: false
    });
    const [stopsAdded, setStopsAdded] = useState(0)
    const headers = useHeaders();

    useEffect( () => {
        const getBookingCreateForm = async () => {
            const client = await clientGetSingle(Number(clientId), headers);
            setBooking({
                ...booking,
                bookingDate: booking?.bookingDate ? new Date(booking?.bookingDate) : new Date(),
                idClient: client,
            });
        }

        getBookingCreateForm();
    }, []);

    useEffect(() => {
        const updateDestinations = () => {
            const updatedDestinations = bookingDestination.map((dest, index, array) => {
                const duration = calculateDuration(dest.startDateTime, dest.endDateTime);
                if (index < array.length - 1) {
                    const { totalHours, waitingTime } = calculateWaitingTime(dest.endDateTime, array[index + 1].startDateTime);
                    array[index + 1] = {
                        ...array[index + 1],
                        waitingTime: totalHours < 38 ? waitingTime : ""
                    };
                }
                return { ...dest, duration };
            });

            setBookingDestination(updatedDestinations);
        };

        updateDestinations();
    }, [bookingDestination]);

    useEffect(() => {
        if (!booking?.hasStop) {
            const newLength = bookingDestination.length - stopsAdded;
            setBookingDestination(bookingDestination.slice(0, newLength));
            setStopsAdded(0); // Reset stopsAdded when hasStop is unchecked
        }
    }, [booking?.hasStop, bookingDestination, setBookingDestination, stopsAdded]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBooking({ ...booking, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const onDateChange = (val: any, property: string) => {
        setBooking({
            ...booking,
            [property]: val
        });
        setErrors({...errors, [property]: !(val) ? true : false });
    };

    const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;

        setBooking({
            ...booking,
            isRoundTrip: newValue === '1' ? true : false
        });

        if (newValue === '1') {
            // Add new item to bookingDestination array
            const newBookingDestination = {
                startDestination: "",
                endDestination: "",
                startDateTime: "",
                endDateTime: "",
                duration: "",
                waitingTime: "",
                idBooking: {} as Booking,
                errors: {
                    startDestination: false,
                    endDestination: false,
                    startDateTime: false,
                    endDateTime: false,
                }
            };
            setBookingDestination([...bookingDestination, newBookingDestination]);
        } else {
            setBookingDestination(bookingDestination.slice(0, -1));
        }
    };

    const addNewBookingDestination = () => {
        if (booking?.hasStop) {
            const newBookingDestination = {
                startDestination: "",
                endDestination: "",
                startDateTime: "",
                endDateTime: "",
                duration: "",
                waitingTime: "",
                idBooking: {} as Booking,
                errors: {
                    startDestination: false,
                    endDestination: false,
                    startDateTime: false,
                    endDateTime: false,
                }
            };
            setBookingDestination([...bookingDestination, newBookingDestination]);
            setStopsAdded(stopsAdded + 1);
        }
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
        setBooking({
            ...booking,
            hasStop: e.target.checked
        });
    };

    const handleArrayChange = ( index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setBookingDestination(bookingDestination =>
            bookingDestination.map((booking, idx) => {
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

        console.log(bookingDestination)
    };

    const handleTimeArrayChange = (property: string, index: number, val: any) => {

        setBookingDestination(bookingDestination =>
            bookingDestination.map((booking, idx) => {
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const updatedBookingDestinations = bookingDestination.map(booking => {
            const errors = {
                startDestination: !booking.startDestination,
                endDestination: !booking.endDestination,
                startDateTime: !booking.startDateTime,
                endDateTime: !booking.endDateTime,
            };
            return { ...booking, errors };
        });

        setBookingDestination(updatedBookingDestinations);

        if (!booking?.bookingDate || !booking?.flightNumber || !booking?.flightClass || !booking?.weight
            || !booking?.price || !booking?.idClient){

            setErrors({
                bookingDate: !booking?.bookingDate ? true : false,
                flightNumber: !booking?.flightNumber ? true : false,
                flightClass: !booking?.flightClass ? true : false,
                weight: !booking?.weight ? true : false,
                price: !booking?.price ? true : false,
            });
            return;
        }

        try {
            const res = await bookingCreate(booking, headers);

            if (res) {
                const idBooking = res.booking.idBooking;

                const updatedBookingDestination: BookingDestination[] = bookingDestination.map(destination => ({
                    ...destination,
                    idBooking: idBooking
                }));

                const bookingDestinationRes = await bookingDestinationCreateAll(updatedBookingDestination, headers);

                if (bookingDestinationRes) {
                    navigate(`/clients/${clientId}`);
                }
            }
        } catch (error) {
            console.error('Booking create failed', error);
        }
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
                            title="Shto Rezervimin"
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
                                                        sx={{width: '100% !important'}}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={12}
                                    >
                                        <Box sx={{display: 'flex'}}>
                                            <FormControl sx={{width: '52%'}}>
                                                <RadioGroup
                                                    aria-labelledby="demo-radio-buttons-group-label"
                                                    defaultValue={booking?.isRoundTrip ? '1' : '0'}
                                                    name="radio-buttons-group"
                                                    onChange={handleRadioChange}
                                                    sx={{display: 'flex', flexDirection: 'row'}}
                                                >
                                                    <FormControlLabel value="0" control={<Radio/>} label="Direkt" />
                                                    <FormControlLabel value="1" control={<Radio />} label="Kthim" />
                                                </RadioGroup>
                                            </FormControl>
                                            <FormGroup sx={{ width: '45%' }}>
                                                <FormControlLabel control={<Checkbox defaultChecked={booking?.hasStop} onChange={handleCheckboxChange} />} label="Ka ndales" />
                                            </FormGroup>
                                        </Box>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.flightNumber}
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
                                            error={errors.flightClass}
                                            label="Klasa e fluturimit"
                                            name="flightClass"
                                            onChange={handleChange}
                                            value={booking?.flightClass ? booking.flightClass : ""}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: booking?.flightClass ? true : false,
                                            }}
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
                                            error={errors.weight}
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
                                            error={errors.price}
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
                                        {bookingDestination.map((bookingDestination, index) => (
                                            <Box width={'100%'} sx={{p: 1,m: 1, border: '1px solid #c7c7c7',
                                                boxShadow: '0px 5px 22px rgb(0 0 0 / 12%), 0px 0px 0px 0.5px rgb(0 0 0 / 8%)', borderRadius: '7px'}}>
                                                <Grid container
                                                    spacing={3}>
                                                    <Grid xs={12} md={6}>
                                                    <FormControl sx={{ width: '100% !important' }}>
                                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                            <DemoContainer components={['DatePicker']} sx={{ width: '100% !important', paddingTop: '0 !important' }}>
                                                                <DateTimePicker
                                                                    label="Data e Nisjes"
                                                                    value={bookingDestination?.startDateTime}
                                                                    onChange={(val) => handleTimeArrayChange('startDateTime', index, val)}
                                                                    ampm={false}
                                                                    format="DD/MM/YYYY HH:mm"
                                                                    sx={{
                                                                        width: '100% !important',
                                                                        border: bookingDestination.errors.startDateTime ? '1px solid red' : 'none',
                                                                        borderRadius: '10px',
                                                                        '& .Mui-error' : {borderColor: '#c7c7c7', boxShadow: 'none', color: '#6c737f'}
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
                                                                    value={bookingDestination?.endDateTime}
                                                                    onChange={(val) => handleTimeArrayChange('endDateTime', index, val)}
                                                                    ampm={false}
                                                                    format="DD/MM/YYYY HH:mm"
                                                                    sx={{
                                                                        width: '100% !important',
                                                                        '& .Mui-error' : {borderColor: '#c7c7c7', boxShadow: 'none', color: '#6c737f'},
                                                                        border: bookingDestination.errors.endDateTime ? '1px solid red' : 'none',
                                                                        borderRadius: '10px',
                                                                    }}
                                                                />
                                                            </DemoContainer>
                                                        </LocalizationProvider>
                                                    </FormControl>
                                                </Grid>
                                                <Grid xs={12} md={6}>
                                                    <TextField
                                                        fullWidth
                                                        error={bookingDestination.errors.startDestination}
                                                        label="Aeroporti i nisjes"
                                                        name="startDestination"
                                                        type='text'
                                                        onChange={(e) => handleArrayChange(index, e)}
                                                        value={bookingDestination?.startDestination}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: bookingDestination?.startDestination ? true : false,
                                                        }}
                                                    />
                                                </Grid>
                                                <Grid xs={12} md={6}>
                                                    <TextField
                                                        fullWidth
                                                        error={bookingDestination.errors.endDestination}
                                                        label="Aeroporti i arritjes"
                                                        name="endDestination"
                                                        type='text'
                                                        onChange={(e) => handleArrayChange(index, e)}
                                                        value={bookingDestination?.endDestination}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: bookingDestination?.endDestination ? true : false,
                                                        }}
                                                    />
                                                </Grid>
                                                </Grid>
                                            </Box>
                                        ))}
                                </Grid>
                                {booking?.hasStop &&
                                    <Box sx={{display: 'flex', width: '100%', justifyContent: 'end', mt: 2.5}}>
                                        <Button
                                            sx={{
                                                backgroundColor: theme.palette.grey[500],
                                                '&:hover': {backgroundColor: theme.palette.grey[600]},
                                            }}
                                            variant="contained"
                                            onClick={addNewBookingDestination}
                                        >
                                            <AddIcon/>
                                        </Button>
                                    </Box>
                                }
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/clients/${clientId}`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            <Button variant="contained" type="submit">
                                Ruaj
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Layout>
    )
}