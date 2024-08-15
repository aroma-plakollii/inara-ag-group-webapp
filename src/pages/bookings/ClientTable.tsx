import {Box, Card, CardActions, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import {Client} from "../../types/client";
import dayjs from "dayjs";

interface ClientTableProps {
    client: Client | undefined;
}
export const ClientTable : React.FC<ClientTableProps>= (props) => {
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
                                    {props.client?.firstName}
                                </TableCell>
                                <TableCell>
                                    {props.client?.lastName}
                                </TableCell>
                                <TableCell>
                                    {props.client?.email}
                                </TableCell>
                                <TableCell>
                                    {props.client?.phone}
                                </TableCell>
                                <TableCell>
                                    {dayjs(props.client?.dateOfBirth).format('DD/MM/YYYY')}
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