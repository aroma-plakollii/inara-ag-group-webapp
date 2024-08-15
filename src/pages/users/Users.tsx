import {Layout} from "../layout/Layout";
import {
    Card,
    TableContainer,
    Box,
    Container,
    Stack,
    CardHeader,
    Table,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
    Button,
    CardActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import theme from "../../theme/theme";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {useEffect, useState} from "react";
import {userDelete, userGetAll, userGetAllPaged} from "../../api/userService";
import { setUsers } from "../../features/users/userSlice";
import { User } from "../../types/user";
import { useHeaders } from "../../hooks/useHeaders";
import {bookingDelete} from "../../api/bookingService";
import AlertConfirm from "../shared/AlertConfirm";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {SkeletonTableWithButton} from "../shared/SkeletonTableWithButton";
import Pagination from "@mui/material/Pagination";

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector((state: RootState) => state.users);
    const [isDeleted, setIsDeleted] = useState<boolean>(false)
    const [alertOpen, setAlertOpen]= useState<boolean>(false);
    const [userId, setUserId]= useState<number | undefined>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const headers = useHeaders();

    useEffect(() => {
        const getUsers = async () => {
            const usersResponse: any = await userGetAllPaged(currentPage, headers);
            
            if(usersResponse)
                dispatch(setUsers(usersResponse.users as User[]));

            setTotalPages(usersResponse.totalPages);
            setLoading(false);
        }

        getUsers();
    }, [dispatch, isDeleted, currentPage]);

    const onDelete = async (id: number | undefined) => {
        setAlertOpen(true);
        setUserId(id);
    };

    const onCloseAlert = async (confirm: any) => {
        if (confirm === 'confirm') {
            const isDeleted = await userDelete(userId, headers);

            if (isDeleted) {
                setIsDeleted(true);
                setAlertOpen(false);
                setUserId(0);
                setLoading(true);
            }
        } else if(confirm === 'cancel'){
            setAlertOpen(false);
            setUserId(0);
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
                        <Stack>
                            <Link to={'/users/add'}>
                                <Button
                                    startIcon={(
                                        <AddIcon />
                                    )}
                                    variant="contained"
                                >
                                    Shto
                                </Button>
                            </Link>
                        </Stack>
                        <Card sx={{pb: 2}}>
                            <CardHeader
                                title="Përdoruesit"
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
                                                    Email
                                                </TableCell>
                                                <TableCell>

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((user: User) => (
                                                <TableRow hover key={user.idUser}>
                                                <TableCell>{user.idUser}</TableCell>
                                                <TableCell>{user.firstName}</TableCell>
                                                <TableCell>{user.lastName}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell align="right" sx={{display: 'flex'}}>
                                                    <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                        backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                            onClick={() => onDelete(user.idUser)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                    <Link to={`/users/${user.idUser}`}>
                                                        <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                                backgroundColor: '#fff4d6', fontSize: '13px', borderRadius: '15px' }}>
                                                            <EditIcon />
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                                </TableRow>
                                            ))}
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
                    title={'Jeni duke fshirë përdoruesin'}
                    message={'Jeni i sigurt që dëshironi të fshini përdoruesin?'}
                    isOpen={alertOpen}
                    onClose={onCloseAlert}
                />}
            </Box>
        </Layout>
    );
}

export default Users;