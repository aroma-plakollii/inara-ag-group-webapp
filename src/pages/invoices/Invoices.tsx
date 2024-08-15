import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import {useHeaders} from "../../hooks/useHeaders";
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
    TableRow, Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import dayjs from "dayjs";
import theme from "../../theme/theme";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AlertConfirm from "../shared/AlertConfirm";
import {InvoiceForm} from "../../types/InvoiceForm";
import {setClientInvoices} from "../../features/clientInvoices/clientInvoiceSlice";
import {ClientInvoice} from "../../types/clientInvoice";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import {getCreateForm, invoiceDelete, invoiceGetAll, invoiceGetAllPaged} from "../../api/InvoiceService";
import {setInvoices} from "../../features/invoices/invoiceSlice";
import {Invoice} from "../../types/invoice";
import {SkeletonTable} from "../shared/SkeletonTable";
import Pagination from "@mui/material/Pagination";

export const Invoices = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user );
    const invoices = useSelector((state: RootState) => state.invoices);
    const [invoiceCreateForm, setInvoiceCreateForm] = useState<InvoiceForm>();
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [invoiceId, setInvoiceId]= useState<number | undefined>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getInvoices = async () => {
            const invoicesResponse: any = await invoiceGetAllPaged(currentPage, headers);
            const invoiceCreateFormResponse = await getCreateForm(headers);

            if(invoicesResponse)
                dispatch(setInvoices(invoicesResponse.invoices as Invoice[]));

            setTotalPages(invoicesResponse.totalPages);
            setInvoiceCreateForm(invoiceCreateFormResponse);
            setLoading(false);
        }

        getInvoices();
    }, [dispatch, isDeleted, currentPage]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setInvoiceId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await invoiceDelete(invoiceId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setInvoiceId(0);
                setLoading(true);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setInvoiceId(0);
        }
    }

    if(loading){
        return (
            <SkeletonTable />
        )
    }

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
                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Faturat"
                            />
                            <TableContainer sx={{ overflowX: 'auto' }}>
                                <Box sx={{minWidth: 800}}>
                                    <Table>
                                        <TableHead sx={{background: '#f8f9fa'}}>
                                            <TableRow>
                                                <TableCell>
                                                    Nr. i faturës
                                                </TableCell>
                                                <TableCell>
                                                    Data
                                                </TableCell>
                                                <TableCell>
                                                    Klienti
                                                </TableCell>
                                                <TableCell>
                                                    Sasia
                                                </TableCell>
                                                <TableCell>
                                                    Totali
                                                </TableCell>
                                                <TableCell align="right">

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {invoices.map((invoice) => {
                                                const client = invoiceCreateForm?.clients.find((client) => client.idClient === invoice.idClient?.idClient);
                                                const formattedMonth = invoice?.date ? dayjs(invoice?.date).format('MMM') : '';
                                                const formattedDay = invoice?.date ? dayjs(invoice?.date).format('DD') : '';
                                                const formattedYear = invoice?.date ? dayjs(invoice?.date).format('YYYY') : '';
                                                return (
                                                    <TableRow
                                                        hover
                                                        key={invoice.idInvoice}
                                                    >
                                                        <TableCell>
                                                            {invoice.invoiceNumber}
                                                        </TableCell>
                                                        <TableCell sx={{pl: 1}}>
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
                                                                <Typography
                                                                    color="text.primary"
                                                                    variant="h6"
                                                                >
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
                                                        <TableCell>
                                                            {`${client?.firstName} ${client?.lastName}`}
                                                        </TableCell>
                                                        <TableCell>
                                                            {invoice.quantity}
                                                        </TableCell>
                                                        <TableCell>
                                                            {invoice.totalPrice}&euro;
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                                <Link to={`/invoices/receipt/${invoice.idInvoice}`}>
                                                                    <Button
                                                                        sx={{
                                                                            mr: '0.5rem',
                                                                            padding: '3px 14px !important',
                                                                            color: 'black',
                                                                            backgroundColor: '#dddddd',
                                                                            fontSize: '13px',
                                                                            borderRadius: '15px'
                                                                        }}
                                                                    >
                                                                        <ReceiptLongIcon />
                                                                    </Button>
                                                                </Link>
                                                                <Link to={`/invoices/${invoice.idInvoice}`}>
                                                                    <Button
                                                                        sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                                            backgroundColor: '#fff4d6', fontSize: '13px', borderRadius: '15px' }}>
                                                                        <EditIcon />
                                                                    </Button>
                                                                </Link>
                                                                { user?.userRole === 'SUPERADMIN' &&
                                                                    <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                                        backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                                            onClick={() => onDelete(invoice.idInvoice)}>
                                                                        <DeleteIcon />
                                                                    </Button>
                                                                }
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TableContainer>
                            {totalPages > 1 &&
                            <Pagination
                                count={totalPages}
                                page={currentPage}
                                onChange={(event, page) => {
                                    setCurrentPage(page);
                                    setLoading(true);
                                }}
                                sx={{ '& .MuiPagination-ul' : {
                                        display: 'flex',
                                        width: '80%',
                                        margin: '1rem auto 0 auto',
                                        justifyContent: 'center'
                                    }}}
                            />}
                        </Card>
                    </Stack>
                </Container>
                {alertOpen && <AlertConfirm
                    title={'Jeni duke fshirë faturën'}
                    message={'Jeni i sigurt që dëshironi të fshini faturën?'}
                    isOpen={alertOpen}
                    onClose={onCloseAlert}
                />}
            </Box>
        </Layout>
    );
}