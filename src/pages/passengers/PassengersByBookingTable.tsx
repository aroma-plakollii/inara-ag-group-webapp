import {Booking} from "../../types/booking";
import {
    Box,
    Button,
    Card, CardActions,
    CardHeader,
    Table,
    TableBody,
    TableCell,
    TableContainer, TableHead,
    TableRow,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import theme from "../../theme/theme";
import {Passenger} from "../../types/passenger";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {Dispatch, SetStateAction, useState} from "react";
import {passengerDelete} from "../../api/passengerService";
import {useHeaders} from "../../hooks/useHeaders";
import AlertConfirm from "../shared/AlertConfirm";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import dayjs from "dayjs";
import Pagination from "@mui/material/Pagination";

interface PassengersByBookingTableProps {
    passengers: Passenger[] | undefined;
    updateDeletion: () => void;
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const PassengersByBookingTable : React.FC<PassengersByBookingTableProps> = (props) => {
    const user = useSelector((state: RootState) => state.auth.user );
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [passengerId, setPassengerId]= useState<number | undefined>(0);
    const headers = useHeaders();

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setPassengerId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await passengerDelete(passengerId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setPassengerId(0);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setPassengerId(0);
        }
        props.updateDeletion();
    }

    return(
        <Card sx={{pb: 2}}>
            <CardHeader
                title="Pasagjerët"
            />
            {props.passengers && props.passengers?.length > 0 ? (
                <TableContainer sx={{ overflowX: 'auto' }}>
                    <Box sx={{minWidth: 800}}>
                        <Table>
                            <TableHead sx={{background: '#f8f9fa'}}>
                                <TableRow>
                                    <TableCell>
                                        Id
                                    </TableCell>
                                    <TableCell>
                                        Emri
                                    </TableCell>
                                    <TableCell>
                                        Mbiemri
                                    </TableCell>
                                    <TableCell>
                                        Email
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
                                {props.passengers?.map((passenger) => {
                                    return (
                                        <TableRow
                                            hover
                                        >
                                            <TableCell sx={{mt: 1}}>
                                                {passenger.idPassenger}
                                            </TableCell>
                                            <TableCell sx={{mt: 1}}>
                                                {passenger.firstName}
                                            </TableCell>
                                            <TableCell sx={{mt: 1}}>
                                                {passenger.lastName}
                                            </TableCell>
                                            <TableCell sx={{mt: 1}}>
                                                {passenger.email}
                                            </TableCell>
                                            <TableCell sx={{mt: 1}}>
                                                {passenger.phone}
                                            </TableCell>
                                            <TableCell sx={{mt: 1}}>
                                                {dayjs(passenger.dateOfBirth).format('DD/MM/YYYY')}
                                            </TableCell>
                                            <TableCell align="right">
                                                <Link to={`/passengers/${passenger.idPassenger}`}>
                                                    <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                        backgroundColor: '#fff4d6', fontSize: '13px', borderRadius: '15px' }}>
                                                        <EditIcon />
                                                    </Button>
                                                </Link>
                                                {user?.userRole === 'SUPERADMIN' && (
                                                    <Button
                                                        sx={{
                                                            padding: '3px 14px !important',
                                                            color: theme.palette.error.dark,
                                                            backgroundColor: '#ffdad7',
                                                            fontSize: '13px',
                                                            borderRadius: '15px'
                                                        }}
                                                        onClick={() => onDelete(passenger.idPassenger)}
                                                    >
                                                        <DeleteIcon />
                                                    </Button>
                                                )}
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
            ) : <Typography px={3}>Rezervimi nuk ka asnjë pasagjer</Typography>}
            {alertOpen && <AlertConfirm
                title={'Jeni duke fshirë pasagjerin'}
                message={'Jeni i sigurt që dëshironi të fshini pasagjerin?'}
                isOpen={alertOpen}
                onClose={onCloseAlert}
            />}
        </Card>
    )
}