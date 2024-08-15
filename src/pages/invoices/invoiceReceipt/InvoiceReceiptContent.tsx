import {
    Box,
    Stack,
    Grid,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Typography
} from '@mui/material';
import dayjs from "dayjs";
import {Booking} from "../../../types/booking";
import {Passenger} from "../../../types/passenger";
import {ClientInvoice} from "../../../types/clientInvoice";
import {Invoice} from "../../../types/invoice";

interface InvoiceReceiptContentProps {
    id: any,
    invoice: Invoice | undefined;
    global: any;
}

export const InvoiceReceiptContent : React.FC<InvoiceReceiptContentProps> = (props) => {
    return (
        <Box id={props.id} sx={{height: '90vh', width: '100%', mt: 1, '@media screen and (max-width: 576px)': { width: '160vw' } }}>
            <Box>
                <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid
                        xs={4}
                    >
                        <Typography variant="body2">
                            {/* <b>{props.global.companyDetails.businessNumber}</b> */}
                            <br/>
                            {/*<b>{props.global.companyDetails.name}</b>*/}
                            {/*<br/>*/}
                            Tel: <b>{props.global.companyDetails.phone}</b>
                            <br/>
                            Adresa: <b>{props.global.companyDetails.address}</b>
                            <br/>
                            Nr: <b>{props.invoice?.invoiceNumber}</b>
                            <br/>
                            Data: <b>{dayjs(props.invoice?.date).format('DD.MM.YYYY')}</b>
                        </Typography>
                    </Grid>
                    <Grid
                        xs={4}
                        sx={{display: 'flex', justifyContent: 'center'}}
                    >
                        <div>
                            <Box
                                sx={{
                                display: 'inline-flex',
                                height: 75,
                                width: 75}}
                            >
                                <img
                                    src="/assets/inara-logo-2.png"
                                    alt="Lockup"
                                    style={{width: '10.2rem', height: 'auto', objectFit: 'contain'}}
                                />
                            </Box>
                        </div>
                    </Grid>
                    <Grid
                        xs={4}
                    >
                        <Typography
                            variant="body2"
                            sx={{
                                textAlign: {xs: 'right'},
                            }}
                        >
                            <b>{`${props.invoice?.idClient?.firstName} ${props.invoice?.idClient?.lastName}`}</b>
                            <br/>
                            {/*Email: <b>{props.invoice?.idClient?.email}</b>*/}
                            {/*<br/>*/}
                            Tel: <b>{props.invoice?.idClient?.phone}</b>
                            {/*<br/>*/}
                            {/*ID: <b>{props.invoice?.idClient?.nationalId}</b>*/}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
            <Table sx={{ mt: 16, border: '1px solid black' }}>
                <TableHead sx={{ border: '1px solid black' }}>
                    <TableRow>
                        <TableCell sx={{py: 1}}>Përshkrimi</TableCell>
                        <TableCell sx={{py: 1}}>Sasia</TableCell>
                        <TableCell sx={{py: 1}}>Çmimi</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow sx={{ border: '1px solid black' }}>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.invoice?.description}</TableCell>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.invoice?.quantity}</TableCell>
                        <TableCell sx={{borderBottom: '1px solid black', py: 1}}>{props.invoice?.price}&euro;</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell
                            colSpan={5}
                            sx={{ borderBottom: 'none', borderTop: '1px solid black', py: 1}}
                        />
                        <TableCell
                            align="right"
                            sx={{ borderBottom: 'none', borderTop: '1px solid black', py: 1 }}
                        >
                            <Typography variant="subtitle2">
                                <span style={{fontWeight: 700, fontSize: '16px', marginRight: '1rem'}}>Totali:</span>
                                {props.invoice?.totalPrice}&euro;
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </ Box>
    )
}