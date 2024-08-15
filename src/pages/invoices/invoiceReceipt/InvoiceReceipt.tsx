import {
    Box,
    Button,
    Container,
    Stack,
    Divider,
    Typography,
    Card,
    SvgIcon
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalPrintshop from '@mui/icons-material/LocalPrintshop';
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {Layout} from "../../layout/Layout";
import {useGlobalData} from "../../../hooks/useGlobalData";
import { useHeaders } from '../../../hooks/useHeaders';
import {bookingGetSingle} from "../../../api/bookingService";
import {Booking} from "../../../types/booking";
import {passengerGetByBooking} from "../../../api/passengerService";
import {Passenger} from "../../../types/passenger";
import AirplaneTicketIcon from "@mui/icons-material/AirplaneTicket";
import {ClientInvoice} from "../../../types/clientInvoice";
import {clientInvoiceGetSingle} from "../../../api/ClientInvoiceService";
import {InvoiceReceiptContent} from "./InvoiceReceiptContent";
import {invoiceGetSingle} from "../../../api/InvoiceService";
import {Invoice} from "../../../types/invoice";
import {SkeletonHomeTable} from "../../shared/SkeletonHomeTable";

export const InvoiceReceipt = () => {
    const { invoiceId } = useParams();
    const [invoice, setInvoice] = useState<Invoice>();
    const globalData = useGlobalData();
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect( () => {
        const getInvoice = async () => {
            const invoiceResponse = await invoiceGetSingle(Number(invoiceId), headers);

            setInvoice(invoiceResponse);
            setLoading(false);
        }

        getInvoice();
    }, []);

    const handlePrint = () => {
        window.print();
    };

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    mb:8
                }}
            >
                <Container maxWidth="lg">
                    <Stack
                        divider={<Divider />}
                        spacing={4}
                    >
                        <Stack spacing={4}>
                            <Stack
                                alignItems="center"
                                direction="row"
                                justifyContent="space-between"
                                spacing={4}
                            >
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                    spacing={2}
                                >
                                    <Link to={`/invoices`}>
                                        <Button sx={{border: 'none', color: 'black', fontSize: '15px'}}>
                                            <ArrowBackIcon sx={{mr: 1}}/> Kthehu
                                        </Button>
                                    </Link>
                                </Stack>
                                <Stack
                                    alignItems="center"
                                    direction="row"
                                >
                                    {/*<Link to={`/invoices/${clientInvoice?.idClientInvoice}`}>*/}
                                    {/*    <Button*/}
                                    {/*        sx={{*/}
                                    {/*            mr: '0.5rem',*/}
                                    {/*            padding: '8px 17px !important',*/}
                                    {/*            color: '#f0d000',*/}
                                    {/*            backgroundColor: '#fff4d6',*/}
                                    {/*            fontSize: '13px',*/}
                                    {/*            borderRadius: '10px'*/}
                                    {/*        }}*/}
                                    {/*    >*/}
                                    {/*        Detajet e faturës*/}
                                    {/*    </Button>*/}
                                    {/*</Link>*/}
                                    <Button
                                        sx={{
                                            mr: '0.5rem',
                                            padding: '8px 17px !important',
                                            color: 'black',
                                            backgroundColor: '#dddddd',
                                            fontSize: '13px',
                                            borderRadius: '10px'
                                        }}
                                        onClick={handlePrint}
                                    >
                                        <SvgIcon>
                                            <LocalPrintshop sx={{color: 'text.secondary'}} />
                                        </SvgIcon>
                                    </Button>
                                </Stack>
                            </Stack>
                        </Stack>
                        {loading ? (
                                <SkeletonHomeTable />
                            ) :
                            (
                            <Card sx={{ px: 6, height: '63rem', overflowX: 'auto', pt: 3}} >
                                <InvoiceReceiptContent id="printContent" invoice={invoice} global={globalData}/>
                            </Card>
                            )
                        }
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
}