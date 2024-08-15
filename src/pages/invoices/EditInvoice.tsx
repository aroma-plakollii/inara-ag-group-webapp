import {Link, useNavigate, useParams} from "react-router-dom";
import {ChangeEvent, useEffect, useState} from "react";
import {Booking} from "../../types/booking";
import {useHeaders} from "../../hooks/useHeaders";
import dayjs from "dayjs";
import {Layout} from "../layout/Layout";
import {
    Box, Button,
    Card, CardActions,
    CardContent,
    CardHeader, Divider, FormControl,
    MenuItem,
    TextField,
    Unstable_Grid2 as Grid
} from "@mui/material";
import {Client} from "../../types/client";
import theme from "../../theme/theme";
import {ClientInvoice} from "../../types/clientInvoice";
import {InvoiceForm} from "../../types/InvoiceForm";
import {Invoice} from "../../types/invoice";
import {getUpdateForm, invoiceGetSingle, invoiceUpdate} from "../../api/InvoiceService";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import {SkeletonDetails} from "../shared/SkeletonDetails";

export const EditInvoice = () => {
    const { invoiceId } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState<Invoice>();
    const [invoiceUpdateForm, setInvoiceUpdateForm] = useState<InvoiceForm>();
    const [errors, setErrors] = useState<any>({
        date: false,
        description: false,
        quantity: false,
        price: false,
        totalPrice: false,
        idClient: false,
    });
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getclientInvoice = async () =>{
            const invoice = await invoiceGetSingle(Number(invoiceId), headers);
            const invoiceUpdateFormResponse = await getUpdateForm(headers);

            setInvoice(invoice);
            setInvoiceUpdateForm(invoiceUpdateFormResponse);
            setLoading(false);
        }

        getclientInvoice();
    }, []);

    useEffect(() => {
        const calculateTotalPrice = async () =>{
            setInvoice({ ...invoice,
                totalPrice: Number((Number(invoice?.quantity) * Number(invoice?.price)).toFixed(2))});
        }

        calculateTotalPrice();
    }, [invoice?.quantity, invoice?.price]);

    const onDateChange = (val: any, property: string) => {
        setInvoice({
            ...invoice,
            [property]: val
        });
        setErrors({...errors, [property]: !(val) ? true : false });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInvoice({ ...invoice, [e.target.name]: e.target.value });
        setErrors({...errors, [e.target.name]: !(e.target.value) ? true : false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        if (!invoice?.date || !invoice?.description || !invoice?.quantity || !invoice?.price
            || !invoice?.totalPrice || !invoice?.idClient){

            setErrors({
                date: !invoice?.date ? true : false,
                description: !invoice?.description ? true : false,
                quantity: !invoice?.quantity ? true : false,
                price: !invoice?.price ? true : false,
                totalPrice: !invoice?.totalPrice ? true : false,
                idClient: !invoice?.idClient ? true : false,
            })
            setLoading(false);
            return;
        }

        try{
            const res = await invoiceUpdate(Number(invoiceId), invoice, headers);

            if(res){
                setLoading(false);
                navigate('/invoices');
            }
        }catch(error) {
            console.error('Invoice update failed', error);
        }
    }

    if(loading){
        return (
            <SkeletonDetails />
        )
    }

    return (
        <Layout>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8,
                    width: '70%',
                    margin: 'auto',
                    '@media screen and (max-width: 576px)': {width: '90%'}
                }}
            >
                <form
                    noValidate
                    onSubmit={handleSubmit}
                >
                    <Card sx={{pb: 2}}>
                        <CardHeader
                            title="Detajet e Faturës"
                        />
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                        md={12}
                                    >
                                        <FormControl sx={{width: '100% !important'}}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                                    <DatePicker
                                                        label="Data"
                                                        value={dayjs(invoice?.date)}
                                                        onChange={(val) => onDateChange(val, 'date')}
                                                        format={'DD/MM/YYYY'}
                                                        sx={{width: '100% !important'}}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </FormControl>
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.description}
                                            label="Përshkrimi"
                                            name="description"
                                            type='text'
                                            onChange={handleChange}
                                            value={invoice?.description}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: invoice?.description ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            error={errors.quantity}
                                            fullWidth
                                            label="Sasia"
                                            name="quantity"
                                            type='text'
                                            onChange={handleChange}
                                            value={invoice?.quantity}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: invoice?.quantity ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.price}
                                            label="Çmimi"
                                            name="price"
                                            type='text'
                                            onChange={handleChange}
                                            value={invoice?.price}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: invoice?.price ? true : false,
                                            }}
                                        />
                                    </Grid>
                                    <Grid
                                        xs={12}
                                        md={6}
                                    >
                                        <TextField
                                            fullWidth
                                            error={errors.totalPrice}
                                            label="Çmimi total"
                                            name="totalPrice"
                                            type='text'
                                            onChange={handleChange}
                                            value={invoice?.quantity && invoice?.price ? (+invoice.quantity * +invoice.price).toFixed(2) : ''}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: invoice?.totalPrice ? true : false,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
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
                </form>
            </Box>
        </Layout>
    )
}