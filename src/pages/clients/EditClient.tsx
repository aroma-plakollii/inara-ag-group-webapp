import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, FormControl, Unstable_Grid2 as Grid, MenuItem } from '@mui/material';
import {Layout} from "../layout/Layout";
import {Link, useNavigate, useParams} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useEffect, useState} from "react";
import {Client} from "../../types/client";
import {ClientForm} from "../../types/clientForm";
import {clientGetSingle, clientUpdate, getUpdateForm} from "../../api/clientService";
import { useHeaders } from '../../hooks/useHeaders';
import {User} from "../../types/user";
import {useSelector, useDispatch} from "react-redux";
import {RootState} from "../../app/store";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {Booking} from "../../types/booking";
import {bookingGetByClient, bookingGetByClientPaged} from "../../api/bookingService";
import BookingsbyClient from "../bookings/BookingsByClient";
import {InvoicesbyClient} from "../invoices/InvoicesByClient";
import {InvoiceForm} from "../../types/InvoiceForm";
import {clientInvoiceGetAll, clientInvoiceGetByClient, getCreateForm} from "../../api/ClientInvoiceService";
import {setClientInvoices} from "../../features/clientInvoices/clientInvoiceSlice";
import {ClientInvoice} from "../../types/clientInvoice";
import {SkeletonDetails} from "../shared/SkeletonDetails";
import {BookingDestination} from "../../types/bookingDestination";
import {bookingDestinationGetAll} from "../../api/bookingDestinationService";

export const EditClient = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [client, setClient] = useState<Client>();
    const [bookings, setBookings] = useState<Booking[]>();
    const [bookingDestinations, setBookingDestinations] = useState<BookingDestination[]>();
    const [clientUpdateForm, setClientUpdateForm] = useState<ClientForm>();
    const [clientInvoiceCreateForm, setClientInvoiceCreateForm] = useState<InvoiceForm>();
    const [errors, setErrors] = useState<any>({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
        nationalId: false,
        passportId: false,
        country: false,
        dateOfBirth: false
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getClient = async () =>{
            const client = await clientGetSingle(Number(clientId), headers);
            let data = {page: currentPage}
            const bookingResponse = await bookingGetByClientPaged(Number(clientId), data, headers);
            const clientInvoicesResponse: any = await clientInvoiceGetByClient(Number(clientId), headers);
            const clientUpdateFormResponse = await getUpdateForm(headers);
            const clientInvoiceCreateFormResponse = await getCreateForm(headers);
            const bookingDestinationResponse = await bookingDestinationGetAll(headers);

            setClient(client);
            setBookings(bookingResponse.bookings);
            setTotalPages(bookingResponse.totalPages);
            setClientUpdateForm(clientUpdateFormResponse);
            setClientInvoiceCreateForm(clientInvoiceCreateFormResponse);
            setBookingDestinations(bookingDestinationResponse.bookingDestinations);
            if(clientInvoicesResponse)
                dispatch(setClientInvoices(clientInvoicesResponse.clientInvoices as ClientInvoice[]));

            setLoading(false);
        }

        getClient();
    }, [currentPage]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setClient({ ...client, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const onDateChange = (val: any) => {
        setClient({
            ...client,
            dateOfBirth: val
        });
        setErrors({...errors, dateOfBirth: !val ? true : false });
    };

    const handleSelectChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setClient({
            ...client,
            [name]: {
                ...(client && client[name as keyof Client] as Record<string, any> || {}),
                [e.target.name]: value,
            },
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!client?.firstName || !client?.lastName || !client?.phone
            || !client?.dateOfBirth || !client?.country){
            setErrors({
                firstName: !client?.firstName ? true : false,
                lastName: !client?.lastName ? true : false,
                phone: !client?.phone ? true : false,
                dateOfBirth: !client?.dateOfBirth ? true : false,
                country: !client?.country ? true : false,
            });
            setLoading(false);
            return;
        }

        try{
            const res = await clientUpdate(Number(clientId), client, headers);

            if(res){
                setLoading(false);
                navigate('/clients');
            }
        }catch(error) {
            console.error('Client update failed', error);
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
                            title="Detajet e Klientit"
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
                                            error={errors.firstName}
                                            label="Emri"
                                            name="firstName"
                                            type='text'
                                            onChange={handleChange}
                                            value={client?.firstName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.firstName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.lastName}
                                            label="Mbiemri"
                                            name="lastName"
                                            onChange={handleChange}
                                            value={client?.lastName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.lastName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Email"
                                            name="email"
                                            type="email"
                                            onChange={handleChange}
                                            value={client?.email}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.email ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.phone}
                                            label="Numri i telefonit"
                                            name="phone"
                                            onChange={handleChange}
                                            value={client?.phone}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.phone ? true : false,
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
                                                        label="Data e lindjes"
                                                        value={dayjs(client?.dateOfBirth)}
                                                        onChange={onDateChange}
                                                        format={'DD/MM/YYYY'}
                                                        sx={{width: '100% !important',
                                                            border: errors.dateOfBirth ? '1px solid red' : 'none',
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
                                            label="Numri i leternjoftimit"
                                            name="nationalId"
                                            onChange={handleChange}
                                            value={client?.nationalId}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.nationalId ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            label="Numri i pasaportës"
                                            name="passportId"
                                            onChange={handleChange}
                                            value={client?.passportId}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.passportId ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.country}
                                            label="Shteti"
                                            name="country"
                                            onChange={handleChange}
                                            value={client?.country}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: client?.country ? true : false,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/clients`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            <Button variant="contained" type="submit">
                                Ruaj ndryshimet
                            </Button>
                        </CardActions>
                    </Card>
                </form>
                <BookingsbyClient
                    bookings={bookings}
                    bookingDestinations={bookingDestinations}
                    clientId={clientId}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}/>
            </Box>
        </Layout>
    )
}