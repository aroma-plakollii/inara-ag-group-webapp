import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
import {setClients} from "../../features/clients/clientSlice";
import {Client} from "../../types/client";
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
    TableRow
} from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import {userType} from "../../api/authService";
import theme from "../../theme/theme";
import {PassengerForm} from "../../types/passengerForm";
import {getCreateForm, passengerDelete, passengerGetAll} from "../../api/passengerService";
import {Passenger} from "../../types/passenger";
import {setPassengers} from "../../features/passengers/passengerSlice";

const Passengers = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user );
    const passengers = useSelector((state: RootState) => state.passengers);
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const headers = useHeaders();

    useEffect(() => {
        const getPassengers = async () => {
            const passengersResponse: any = await passengerGetAll(headers);

            if(passengersResponse)
                dispatch(setPassengers(passengersResponse.passengers as Passenger[]));
        }

        getPassengers();
    }, [dispatch, isDeleted]);

    const onDelete = async (id: number | undefined) => {
        const isDeleted = await passengerDelete(id, headers);

        if (isDeleted){
            setIsDeleted(true);
        }
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
                        <div>
                            <Link to={'/passengers/add'}>
                                <Button
                                    startIcon={(
                                        <AddIcon />
                                    )}
                                    variant="contained"
                                >
                                    Shto
                                </Button>
                            </Link>
                        </div>

                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Pasagjerët"
                            />
                            <TableContainer sx={{ overflowX: 'auto' }}>
                                <Box sx={{minWidth: 800}}>
                                    <Table>
                                        <TableHead sx={{background: '#f8f9fa'}}>
                                            <TableRow>
                                                <TableCell>
                                                    Emri
                                                </TableCell>
                                                <TableCell>
                                                    Mbiemri
                                                </TableCell>
                                                <TableCell>
                                                    Numri i telefonit
                                                </TableCell>
                                                <TableCell>
                                                    Data e lindjes
                                                </TableCell>
                                                <TableCell align="right">

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {passengers.map((passenger) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        key={passenger.idPassenger}
                                                    >

                                                        <TableCell>
                                                            {passenger.firstName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {passenger.lastName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {passenger.phone}
                                                        </TableCell>
                                                        <TableCell>
                                                            {dayjs(passenger.dateOfBirth).format('DD/MM/YYYY')}
                                                        </TableCell>
                                                        <TableCell align="right" sx={{display: 'flex'}}>
                                                            { user?.userRole === 'super-admin' &&
                                                                <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                                    backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                                        onClick={() => onDelete(passenger.idPassenger)}>
                                                                    FSHIJ
                                                                </Button>
                                                            }
                                                            <Link to={`/passengers/${passenger.idPassenger}`}>
                                                                <Button
                                                                    sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                                        backgroundColor: '#fff4d6', fontSize: '13px', borderRadius: '15px' }}>
                                                                    DETAJET
                                                                </Button>
                                                            </Link>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TableContainer>
                            <CardActions />
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default Passengers;