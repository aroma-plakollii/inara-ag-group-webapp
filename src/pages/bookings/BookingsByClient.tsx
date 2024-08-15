import {Layout} from "../layout/Layout";
import {
    Box,
    Container,
    Stack,
    Button,
    FormControl,
} from '@mui/material';
import {Dispatch, SetStateAction} from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import {Link} from "react-router-dom";
import {BookingsByClientTable} from "./BookingsByClientTable";
import {Booking} from "../../types/booking";
import theme from "../../theme/theme";
import {BookingDestination} from "../../types/bookingDestination";

interface BookingsByClientProps {
    bookings: Booking[] | undefined;
    bookingDestinations: BookingDestination[] | undefined;
    clientId: string | undefined;
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const BookingsbyClient : React.FC<BookingsByClientProps> = (props) => {

    return (
        <Box sx={{width: "100%", mt: 4}}>
            <Stack spacing={3}>
                <Box sx={{display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 1}}>
                    <Link to={`/bookings/add/${props.clientId}`}>
                        <Button
                            startIcon={(
                                <AddIcon />
                            )}
                            variant="contained"
                        >
                            Shto Rezervimin
                        </Button>
                    </Link>
                    <Link to={`/invoices/add/${props.clientId}`}>
                        <Button
                            startIcon={(
                                <AddIcon />
                            )}
                            variant="contained"
                        >
                            Shto Faturën
                        </Button>
                    </Link>
                    <Link to={`/invoices/client/${props.clientId}`}>
                        <Button
                            sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}
                            startIcon={(
                                <RemoveRedEyeIcon />
                            )}
                            variant="contained"
                        >
                            Shiko Faturat
                        </Button>
                    </Link>
                </Box>

                <BookingsByClientTable
                    bookings={props.bookings}
                    bookingDestinations={props.bookingDestinations}
                    currentPage={props.currentPage}
                    setCurrentPage={props.setCurrentPage}
                    totalPages={props.totalPages}
                />
            </Stack>
        </Box>
    );
}

export default BookingsbyClient;