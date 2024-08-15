import {Box, Card, CardActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import dayjs from "dayjs";
import {Passenger} from "../../types/passenger";

interface PassengerTableProps {
    passenger: Passenger | undefined;
}
export const PassengerTable : React.FC<PassengerTableProps>= (props) => {
    return (
        <Card sx={{py: 4,}}>
            <TableContainer sx={{ overflowX: 'auto' }}>
                <Box sx={{minWidth: 800}}>
                    <Table>
                        <TableHead>
                            <TableRow>
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
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                hover
                            >
                                <TableCell>
                                    {props.passenger?.firstName}
                                </TableCell>
                                <TableCell>
                                    {props.passenger?.lastName}
                                </TableCell>
                                <TableCell>
                                    {props.passenger?.email}
                                </TableCell>
                                <TableCell>
                                    {props.passenger?.phone}
                                </TableCell>
                                <TableCell>
                                    {dayjs(props.passenger?.dateOfBirth).format('DD/MM/YYYY')}
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Box>
                <CardActions />
            </TableContainer>
        </Card>
    )
}