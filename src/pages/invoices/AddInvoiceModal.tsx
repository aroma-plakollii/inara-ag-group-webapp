import {Layout} from "../layout/Layout";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    FormControl,
    Modal,
    Typography,
    Unstable_Grid2 as Grid
} from "@mui/material";
import theme from "../../theme/theme";
import {useEffect, useState} from "react";
import {bookingDelete} from "../../api/bookingService";
import {useNavigate, useParams} from "react-router-dom";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DemoContainer} from "@mui/x-date-pickers/internals/demo";
import {DatePicker} from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import {Invoice} from "../../types/invoice";
import {invoiceCreate} from "../../api/InvoiceService";
import {useHeaders} from "../../hooks/useHeaders";
import {clientGetSingle} from "../../api/clientService";

export const AddInvoiceModal = () => {
    const { clientId } = useParams();
    const navigate = useNavigate();
    const [invoice, setInvoice] = useState<Invoice>();
    const [alertOpen, setAlertOpen]= useState<boolean>(true);
    const [errors, setErrors] = useState<any>({
        date: false,
    });
    const headers = useHeaders();

    const onDateChange = (val: any) => {
        setInvoice({
            ...invoice,
            date: val
        });
        setErrors({...errors, date: !val ? true : false });
    };

    const onClose = async (confirm: any) => {
        if (confirm === 'confirm') {
            if (!invoice?.date){
                setErrors({
                    date: !invoice?.date ? true : false,
                });
                return;
            }
            try {
                const res = await invoiceCreate(invoice, headers);
                console.log(res)

                if(res){
                    setAlertOpen(false);
                    navigate(`/clientInvoices/add/${clientId}/${res.invoice.idInvoice}`);
                }
            }catch(error) {
                console.error('Client create failed', error);
            }
        } else if(confirm === 'cancel'){
                setAlertOpen(false);
                navigate(`/invoices`);
        }
    }

    return(
        <Layout>
            <Modal open={alertOpen} onClose={() => onClose('cancel')}
                   sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
                   aria-labelledby="modal-modal-title"
                   aria-describedby="modal-modal-description" >
                <Card sx={{width: '30%'}}>
                    <CardHeader
                        title={`Shto Faturën`}
                    />
                    <CardContent>
                        <Box sx={{m: -1.5}}>
                            <Grid
                                xs={12}
                                md={12}
                            >
                                <FormControl sx={{width: '100% !important'}}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DemoContainer components={['DatePicker']} sx={{width: '100% !important', paddingTop: '0 !important'}}>
                                            <DatePicker
                                                label="Data"
                                                value={invoice?.date}
                                                onChange={onDateChange}
                                                format={'DD/MM/YYYY'}
                                                sx={{width: '100% !important',
                                                    border: errors.date ? '1px solid red' : 'none',
                                                    borderRadius: '10px'}}
                                            />
                                        </DemoContainer>
                                    </LocalizationProvider>
                                </FormControl>
                            </Grid>
                        </Box>
                    </CardContent>
                    <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                        <Button variant="outlined" sx={{ color: 'white', borderColor: theme.palette.grey[500], backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600], borderColor: theme.palette.grey[500],}}} onClick={() => onClose('cancel')}>
                            Anulo
                        </Button>
                        <Button variant="contained" color="primary" onClick={() => onClose('confirm')}>
                            Shto
                        </Button>
                    </CardActions>
                </Card>
            </Modal>
        </Layout>
    )
}