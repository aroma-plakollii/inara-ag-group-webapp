import {Booking} from "../../types/booking";
import {Box, Button, Container, Stack} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import {BookingsByClientTable} from "../bookings/BookingsByClientTable";
import {InvoicesByClientTable} from "./InvoicesByClientTable";
import {ClientInvoice} from "../../types/clientInvoice";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
import {setClientInvoices} from "../../features/clientInvoices/clientInvoiceSlice";
import {Layout} from "../layout/Layout";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Client} from "../../types/client";
import {clientGetSingle} from "../../api/clientService";
import {InvoiceForm} from "../../types/InvoiceForm";
import {Invoice} from "../../types/invoice";
import {getCreateForm, invoiceGetByClient, invoiceGetByClientPaged} from "../../api/InvoiceService";
import {SkeletonTableWithButton} from "../shared/SkeletonTableWithButton";

interface InvoicesByClientProps {
    invoices: Invoice[] | undefined;
    invoiceCreateForm: InvoiceForm | undefined;
}

export const InvoicesbyClient = () => {
    const dispatch = useDispatch();
    const { clientId } = useParams();
    const [invoices, setInvoices] = useState<Invoice[]>();
    const [invoiceCreateForm, setInvoiceCreateForm] = useState<InvoiceForm>();
    const [client, setClient] = useState<Client>();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getClientInvoices = async () => {
            let data = {page: currentPage}
            const invoicesResponse: any = await invoiceGetByClientPaged(Number(clientId), data, headers);
            const clientResponse: any = await clientGetSingle(Number(clientId), headers);
            const invoiceCreateFormResponse = await getCreateForm(headers);

            setInvoices(invoicesResponse.invoices);
            setTotalPages(invoicesResponse.totalPages);
            setClient(clientResponse);
            setInvoiceCreateForm(invoiceCreateFormResponse);
            setLoading(false);
        }

        getClientInvoices();
    }, [dispatch, currentPage]);

    if(loading){
        return (
            <SkeletonTableWithButton />
        )
    }

    return (
        <Layout>
            <Box sx={{width: "100%", mt: 4}}>
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        py: 8
                    }}
                >
                    <Container maxWidth="xl">
                        <div>
                            <Link to={`/clients/${clientId}`}>
                                <Button sx={{border: 'none', color: 'black', fontSize: '15px', mb: 2}}>
                                    <ArrowBackIcon sx={{mr: 1}}/> Kthehu
                                </Button>
                            </Link>
                        </div>
                        <Stack spacing={3}>
                            <InvoicesByClientTable
                                invoices={invoices}
                                invoiceCreateForm={invoiceCreateForm}
                                client={client}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                                totalPages={totalPages}/>
                        </Stack>
                    </Container>
                </Box>
            </Box>
        </Layout>
    );
}