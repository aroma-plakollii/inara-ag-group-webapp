import {Layout} from "../layout/Layout";
import { Card,Box, Container, Stack, CardHeader, Table, TableHead, TableRow, TableBody, TableCell, Button, CardActions, TableContainer} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import dayjs from 'dayjs';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import {clientDelete, clientGetAll, clientGetAllPaged, getCreateForm} from "../../api/clientService";
import {setClients} from "../../features/clients/clientSlice";
import {Client} from "../../types/client";
import {ClientForm} from "../../types/clientForm";
import theme from "../../theme/theme";
import { useHeaders } from "../../hooks/useHeaders";
import {userType} from "../../api/authService";
import AlertConfirm from "../shared/AlertConfirm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {SkeletonTableWithButton} from "../shared/SkeletonTableWithButton";
import Pagination from "@mui/material/Pagination";

const Clients = () => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.auth.user );
    const clients = useSelector((state: RootState) => state.clients);
    const [clientCreateForm, setClientCreateForm] = useState<ClientForm>();
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [clientId, setClientId]= useState<number | undefined>(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState<boolean>(true);
    const headers = useHeaders();

    useEffect(() => {
        const getClients = async () => {
            const clientsResponse: any = await clientGetAllPaged(currentPage, headers);
            const clientCreateFormResponse = await getCreateForm(headers);

            if(clientsResponse)
                dispatch(setClients(clientsResponse.clients as Client[]));

            setTotalPages(clientsResponse.totalPages);
            setClientCreateForm(clientCreateFormResponse);
            setLoading(false);
        }

        getClients();
    }, [dispatch, isDeleted, currentPage]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setClientId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await clientDelete(clientId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setClientId(0);
                setLoading(true);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setClientId(0);
        }
    }

    if(loading){
        return (
            <SkeletonTableWithButton />
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
                        <div>
                            <Link to={'/clients/add'}>
                                <Button
                                    startIcon={(
                                        <AddIcon />
                                    )}
                                    variant="contained"
                                >
                                    Shto
                                </Button>
                            </Link>
                        </div>

                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Klientët"
                            />
                            <TableContainer sx={{ overflowX: 'auto' }}>
                                <Box sx={{minWidth: 800}}>
                                    <Table>
                                        <TableHead sx={{background: '#f8f9fa'}}>
                                            <TableRow>
                                                <TableCell>
                                                    Id
                                                </TableCell>
                                                <TableCell>
                                                    Emri
                                                </TableCell>
                                                <TableCell>
                                                    Mbiemri
                                                </TableCell>
                                                <TableCell>
                                                    Numri i leternjoftimit
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
                                                <TableCell align="right">

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {clients.map((client) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                        key={client.idClient}
                                                    >
                                                        <TableCell>
                                                            {client.idClient}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.firstName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.lastName}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.nationalId}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.email}
                                                        </TableCell>
                                                        <TableCell>
                                                            {client.phone}
                                                        </TableCell>
                                                        <TableCell>
                                                            {dayjs(client.dateOfBirth).format('DD/MM/YYYY')}
                                                        </TableCell>
                                                        <TableCell align="right" sx={{display: 'flex'}}>
                                                            { user?.userRole === 'SUPERADMIN' &&
                                                                <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                                    backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                                        onClick={() => onDelete(client.idClient)}>
                                                                    <DeleteIcon />
                                                                </Button>
                                                            }
                                                            <Link to={`/clients/${client.idClient}`}>
                                                                <Button
                                                                        sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                                        backgroundColor: '#fff4d6', fontSize: '13px', borderRadius: '15px' }}>
                                                                    <EditIcon />
                                                                </Button>
                                                            </Link>
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
                    title={'Jeni duke fshirë klientin'}
                    message={'Jeni i sigurt që dëshironi të fshini klientin?'}
                    isOpen={alertOpen}
                    onClose={onCloseAlert}
                />}
            </Box>
        </Layout>
    );
}

export default Clients;