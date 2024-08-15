import {Layout} from "./layout/Layout";
import {
    Card,
    TableContainer,
    Box,
    Container,
    Stack,
    Typography,
    CardHeader,
    Table,
    TableRow,
    TableBody,
    TableCell,
    Button,
    CardActions,
    TextField, FormControl, RadioGroup, FormControlLabel, Radio
} from '@mui/material';
import {Link} from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import {useState} from "react";
import {searchClients} from "../api/clientService";
import {Client} from "../types/client";
import { useHeaders } from "../hooks/useHeaders";
import {Passenger} from "../types/passenger";
import {searchBooking} from "../api/bookingService";
import dayjs from "dayjs";
import {Booking} from "../types/booking";
import {SkeletonHomeTable} from "./shared/SkeletonHomeTable";

const Home = () => {
    const [searchTerm, setSearchTerm] = useState<string | number>('');
    const [clients, setClients] = useState<Client[]>([]);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [radioValue, setRadioValue] = useState("0");
    const [hasSearched, setHasSearched] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);
    const headers = useHeaders();

    const handleSearchChange = (event: any) => {
        setSearchTerm(event.target.value);
    };

    const handleChange = (event: any) => {
        setRadioValue(event.target.value);
        setHasSearched("");
    };

    const getClients = async (term: string | number) => {
        if(radioValue === "0"){
            const clientRes = await searchClients(term, headers);
            setClients(clientRes);
            setHasSearched("clients");
            setLoading(false);
        }else{
            const bookingRes = await  searchBooking(term, headers);
            setBookings(bookingRes);
            setHasSearched("bookings");
            setLoading(false);
        }
    }

    const handleButtonClick = () => {
        setLoading(true);
        getClients(searchTerm);
    };

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
                        <Card sx={{ 
                            py: 4, 
                            display: 'flex', 
                            flexDirection: 'column', 
                            alignItems: 'center',
                            border: "1px solid #b4b4b4" 
                            }}>
                            <Stack
                                width="90%"
                                direction="row"
                                flexWrap="wrap"
                                gap={2}
                            >
                                <Box sx={{ flexGrow: 1 }}>
                                    <TextField
                                        defaultValue=""
                                        onChange={handleSearchChange}
                                        fullWidth
                                        label="Kërko"
                                        name="query"
                                        sx={{backgroundColor: "transperent"}}
                                    />
                                </Box>
                                <Button
                                    // size="large"
                                    onClick={handleButtonClick}
                                    variant="contained"
                                    sx={{width: '15%', '@media screen and (max-width: 768px)': {width: '25%'},
                                        '@media screen and (max-width: 576px)': {width: '4%'}}}
                                >
                                    <SearchIcon /> <Typography sx={{fontSize: '15px', ml: 1, '@media screen and (max-width: 576px)': {display: 'none'}}}>Kërko</Typography>
                                </Button>
                            </Stack>
                            <Box sx={{width: '90%', mt: 3}} display={"flex"} justifyContent={"space-between"}>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        defaultValue={radioValue}
                                        onChange={handleChange}
                                        name="row-radio-buttons-group"
                                    >
                                        <FormControlLabel value="0" control={<Radio />} label="Klienti" />
                                        <FormControlLabel value="1" control={<Radio />} label="Rezervimi" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Card>

                        {
                            hasSearched === "clients" &&
                                <>
                                    {loading ? (
                                        <SkeletonHomeTable />
                                    ) : (
                                        clients.length > 0 && radioValue === "0" ? (
                                            <Card sx={{pb: 2}}>
                                                <CardHeader title="Klientet"/>
                                                <TableContainer sx={{overflowX: 'auto'}}>
                                                    <Box sx={{minWidth: 800}}>
                                                        <Table>
                                                            <TableBody>
                                                                {clients.map((client) => (
                                                                    <TableRow key={client.idClient} hover>
                                                                        <TableCell>{client.idClient}</TableCell>
                                                                        <TableCell sx={{mt: 1}}>{`${client?.firstName} ${client?.lastName}`}</TableCell>
                                                                        <TableCell>{client.nationalId}</TableCell>
                                                                        <TableCell>{client.email}</TableCell>
                                                                        <TableCell sx={{mt: 1}}>{client.phone}</TableCell>
                                                                        <TableCell>{dayjs(client.dateOfBirth).format('DD/MM/YYYY')}</TableCell>
                                                                        <TableCell align="right">
                                                                            <Link to={`/clients/${client.idClient}`}>
                                                                                <Button variant="contained">Rezervimet</Button>
                                                                            </Link>
                                                                        </TableCell>
                                                                    </TableRow>
                                                                ))}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </TableContainer>
                                                <CardActions/>
                                            </Card>
                                        ) : (
                                            <Card sx={{p: 4}}>
                                                <Typography>Nuk është gjetur asnjë klient</Typography>
                                            </Card>
                                        )
                                    )}
                                </>
                        }
                        {
                            hasSearched === "bookings" &&
                                <>
                                    {loading ? (
                                        <SkeletonHomeTable />
                                    ) : (
                                        bookings.length > 0 && radioValue === "1" ? (
                                            <Card sx={{pb: 2}}>
                                                <CardHeader title="Rezervimet"/>
                                                <TableContainer sx={{overflowX: 'auto'}}>
                                                    <Box sx={{minWidth: 800}}>
                                                        <Table>
                                                            <TableBody>
                                                                {bookings.map((booking) => {
                                                                    const formattedMonth = booking.bookingDate ? dayjs(booking.bookingDate).format('MMM') : '';
                                                                    const formattedDay = booking.bookingDate ? dayjs(booking.bookingDate).format('DD') : '';
                                                                    const formattedYear = booking.bookingDate ? dayjs(booking.bookingDate).format('YYYY') : '';

                                                                    return (
                                                                        <TableRow key={booking.idBooking} hover>
                                                                            <TableCell sx={{mt: 1}}>{booking.idBooking}</TableCell>
                                                                            <TableCell sx={{mt: 1}}>
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
                                                                                    <Typography color="text.primary" variant="h6">
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
                                                                            <TableCell sx={{mt: 1}}>{booking.bookingNumber}</TableCell>
                                                                            <TableCell>{booking.flightNumber}</TableCell>
                                                                            <TableCell>
                                                                                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '75%'}}>
                                                                                    <Box>
                                                                                        <Typography sx={{fontSize: '14px', lineHeight: '24px'}}>
                                                                                            {booking?.departureAirport}
                                                                                        </Typography>
                                                                                        <Typography sx={{fontSize: '14px'}}>
                                                                                            {dayjs(booking?.departureDateTime).format('DD/MM/YYYY')}
                                                                                        </Typography>
                                                                                        <Typography sx={{fontSize: '12px'}}>
                                                                                            {dayjs(booking?.departureDateTime).format('HH:mm')}h
                                                                                        </Typography>
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <Typography sx={{pb: 1}}> _ </Typography>
                                                                                        <br/>
                                                                                        <br/>
                                                                                    </Box>
                                                                                    <Box>
                                                                                        <Typography sx={{fontSize: '14px', lineHeight: '24px'}}>
                                                                                            {booking?.arrivalAirport}
                                                                                        </Typography>
                                                                                        <Typography sx={{fontSize: '14px'}}>
                                                                                            {dayjs(booking?.arrivalDateTime).format('DD/MM/YYYY')}
                                                                                        </Typography>
                                                                                        <Typography sx={{fontSize: '12px'}}>
                                                                                            {dayjs(booking?.arrivalDateTime).format('HH:mm')}h
                                                                                        </Typography>
                                                                                    </Box>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell>{`${booking.price}€`}</TableCell>
                                                                            <TableCell align="right">
                                                                                <Link to={`/bookings/${booking.idBooking}`}>
                                                                                    <Button variant="contained">Detajet</Button>
                                                                                </Link>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })}
                                                            </TableBody>
                                                        </Table>
                                                    </Box>
                                                </TableContainer>
                                                <CardActions/>
                                            </Card>
                                        ) : (
                                            <Card sx={{p: 4}}>
                                                <Typography>Nuk është gjetur asnjë rezervim</Typography>
                                            </Card>
                                        )
                                    )}
                                </>
                        }
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default Home