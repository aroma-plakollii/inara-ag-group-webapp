import {
    Box,
    Button, Card, CardActions,
    CardHeader,
    Container, MenuItem,
    Stack,
    Table, TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow, TextField, Typography, Unstable_Grid2 as Grid
} from "@mui/material";
import AddBoxIcon from '@mui/icons-material/AddBox';
import {Layout} from "../layout/Layout";
import {Link, useNavigate, useParams} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useEffect, useState} from "react";
import {Invoice} from "../../types/invoice";
import {clientInvoiceCreateAll, getCreateForm} from "../../api/ClientInvoiceService";
import {invoiceGetSingle} from "../../api/InvoiceService";
import {useHeaders} from "../../hooks/useHeaders";
import {InvoiceForm} from "../../types/InvoiceForm";
import {ClientInvoice, ClientInvoiceAdd} from "../../types/clientInvoice";
import {Client} from "../../types/client";
import {passengerCreate} from "../../api/passengerService";
import {clientGetSingle} from "../../api/clientService";

export const AddClientInvoice = () => {
    const { clientId } = useParams();
    const { invoiceId } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState<Invoice>();
    const [client, setClient] = useState<Client>();
    const [clientInvoices, setClientInvoices] = useState<ClientInvoiceAdd[]>([{
        idClient: {} as Client,
        description: "",
        quantity: "",
        price: "",
        totalPrice: "",
        idInvoice: {} as Invoice,
        errors: {
            description: false,
            quantity: false,
            price: false,
            totalPrice: false,
            idClient: false,
        }
    }]);
    const [clientInvoiceCreateForm, setClientCreateInvoiceForm] = useState<InvoiceForm>();
    const headers = useHeaders();

    useEffect(() => {
        const getInvoice = async () =>{
            const fetchedInvoice: Invoice = await invoiceGetSingle(Number(invoiceId), headers);
            const fetchedClient: Client = await clientGetSingle(Number(clientId), headers);
            const clientInvoiceCreateFormResponse = await getCreateForm(headers);

            setInvoice(fetchedInvoice);
            setClient(fetchedClient);
            setClientCreateInvoiceForm(clientInvoiceCreateFormResponse);
            setClientInvoices(currentInvoices => {
                return currentInvoices.map(clientInvoice => {
                    return { ...clientInvoice, idInvoice: fetchedInvoice, idClient: fetchedClient};
                });
            });
        }

        getInvoice();
    }, []);

    const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;

        setClientInvoices(currentInvoices =>
            currentInvoices.map((invoice, idx) => {
                if (idx === index) {
                    const updatedInvoice = {
                        ...invoice,
                        [name]: value,
                        totalPrice: (Number(invoice.quantity) * Number(invoice.price)),
                        errors: {
                            ...invoice.errors,
                            [name]: !value
                        }
                    };
                    return updatedInvoice;
                }
                return invoice;
            })
        );
    };


    const addNewInvoice = () => {
        const newInvoice = {
            idInvoice: invoice,
            idClient: client,
            description: "",
            quantity: "",
            price: "",
            totalPrice: "",
            errors: {
                description: false,
                quantity: false,
                price: false,
                totalPrice: false,
                idClient: false,
            }
        };
        setClientInvoices([...clientInvoices, newInvoice]);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        setClientInvoices(currentInvoices => {
            return currentInvoices.map(invoice => {
                const errors = {
                    description: !invoice.description,
                    quantity: !invoice.quantity,
                    price: !invoice.price,
                    totalPrice: !invoice.totalPrice,
                    idClient: !invoice.idClient
                };
                return { ...invoice, errors };
            });
        });

        try{
            const res = await clientInvoiceCreateAll(clientInvoices, headers);

            if(res){
                navigate('/invoices');
            }
        }catch(error) {
            console.error('Passenger create failed', error);
        }
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
                                title={`${invoice?.invoiceNumber} - ${client?.firstName} ${client?.lastName}`}
                            />
                            <TableContainer sx={{ overflowX: 'auto' }}>
                                <Box sx={{minWidth: 800}}>
                                    <Table>
                                        <TableHead sx={{background: '#f8f9fa'}}>
                                            <TableRow>
                                                <TableCell sx={{width: '25%'}}>
                                                    Përshkrimi
                                                </TableCell>
                                                <TableCell>
                                                    Sasia
                                                </TableCell>
                                                <TableCell>
                                                    Çmimi
                                                </TableCell>
                                                <TableCell>
                                                    Çmimi total
                                                </TableCell>
                                                <TableCell align="right">

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {clientInvoices.map((clientInvoice, index) => (
                                            <TableRow
                                                hover
                                                key={index}
                                            >
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        error={clientInvoice.errors.description}
                                                        label="Përshkrimi"
                                                        name="description"
                                                        type='text'
                                                        onChange={(e) => handleChange(index, e)}
                                                        value={clientInvoice?.description}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: clientInvoice?.description ? true : false,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        error={clientInvoice.errors.quantity}
                                                        fullWidth
                                                        label="Sasia"
                                                        name="quantity"
                                                        type='text'
                                                        onChange={(e) => handleChange(index, e)}
                                                        value={clientInvoice?.quantity}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: clientInvoice?.quantity ? true : false,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        error={clientInvoice.errors.price}
                                                        label="Çmimi"
                                                        name="price"
                                                        type='text'
                                                        onChange={(e) => handleChange(index, e)}
                                                        value={clientInvoice?.price}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: clientInvoice?.price ? true : false,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <TextField
                                                        fullWidth
                                                        error={clientInvoice.errors.totalPrice}
                                                        label="Çmimi total"
                                                        name="totalPrice"
                                                        type='text'
                                                        onChange={(e) => handleChange(index, e)}
                                                        value={clientInvoice?.quantity && clientInvoice?.price ? (+clientInvoice.quantity * +clientInvoice.price).toFixed(2) : ''}
                                                        variant="outlined"
                                                        InputLabelProps={{
                                                            shrink: clientInvoice?.totalPrice ? true : false,
                                                        }}
                                                    />
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        onClick={addNewInvoice}
                                                        sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                            backgroundColor: '#fff4d6', fontSize: '13px', borderRadius: '15px' }}>
                                                        <AddBoxIcon />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </Box>
                            </TableContainer>
                            <CardActions sx={{justifyContent: 'right', pt: 2}}>
                                <Link to={`/invoices`}>
                                    <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                        Anulo
                                    </Button>
                                </Link>
                                <Button variant="contained" type="submit" onClick={handleSubmit}>
                                    Ruaj
                                </Button>
                            </CardActions>
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    )
}