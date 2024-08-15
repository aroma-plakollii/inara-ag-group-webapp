import {Booking} from "../../types/booking";
import {Box, Button, Stack} from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {Passenger} from "../../types/passenger";
import {PassengersByBookingTable} from "./PassengersByBookingTable";
import {Dispatch, SetStateAction} from "react";

interface PassengersByBookingProps {
    passengers: Passenger[] | undefined;
    bookingId: string | undefined;
    updateDeletion: () => void;
    currentPage: number;
    totalPages: number;
    setCurrentPage: Dispatch<SetStateAction<number>>;
}

export const PassengersByBooking : React.FC<PassengersByBookingProps> = (props) => {

    return (
        <Box sx={{width: "100%", mt: 4}}>
            <Stack spacing={3}>
                <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Link to={`/passengers/add/${props.bookingId}`}>
                        <Button
                            startIcon={(
                                <AddIcon />
                            )}
                            variant="contained"
                        >
                            Shto Pasagjerin
                        </Button>
                    </Link>
                </Box>

                <PassengersByBookingTable
                    updateDeletion={props.updateDeletion}
                    passengers={props.passengers}
                    currentPage={props.currentPage}
                    setCurrentPage={props.setCurrentPage}
                    totalPages={props.totalPages}/>
            </Stack>
        </Box>
    );
}

export default PassengersByBooking;