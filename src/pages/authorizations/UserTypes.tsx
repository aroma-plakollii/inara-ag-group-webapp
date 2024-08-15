import {Layout} from "../layout/Layout";
import { Card,Box, Container, Stack, CardHeader, Table, TableHead, TableRow, TableBody, TableCell, Button, CardActions, TableContainer} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../app/store";
import {useEffect, useState} from "react";
import theme from "../../theme/theme";
import {userTypeDelete, userTypeGetAll} from "../../api/userTypeService";
import {setUserTypes} from "../../features/userTypes/userTypeSlice";
import {UserType} from "../../types/userType";
import { useHeaders } from "../../hooks/useHeaders";

const UserTypes = () => {
    const dispatch = useDispatch();
    const userTypes = useSelector((state: RootState) => state.userTypes)
    const [isDeleted, setIsDeleted] = useState<boolean>(false);
    const headers = useHeaders();

    useEffect(() => {
        const getUserTypes = async () => {
            const userTypeResponse: any = await userTypeGetAll(headers);

            if(userTypeResponse)
                dispatch(setUserTypes(userTypeResponse.userTypes as UserType[]));
        }

        getUserTypes();
    }, [dispatch, isDeleted]);

    const onDelete = async (id: number | undefined) => {
        const isDeleted = await userTypeDelete(id, headers);

        if (isDeleted){
            setIsDeleted(true);
        }
    };

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
                            <Link to={'/authorizations/add'}>
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
                                title="Llojet e përdoruesve"
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
                                                <TableCell align="right">

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {userTypes.map((userType) => {
                                                return (
                                                    <TableRow
                                                        hover
                                                    >
                                                        <TableCell>
                                                            {userType.idUserType}
                                                        </TableCell>
                                                        <TableCell>
                                                            {userType.typeName}
                                                        </TableCell>
                                                        <TableCell align="right" sx={{display: 'flex'}}>
                                                            <Button sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.error.dark,
                                                                backgroundColor: '#ffdad7', fontSize: '13px', borderRadius: '15px' }}
                                                                    onClick={() => onDelete(userType.idUserType)}>
                                                                FSHIJ
                                                            </Button>
                                                            <Link to={`/authorizations/type/${userType.idUserType}`}>
                                                                <Button
                                                                    sx={{mr: '0.5rem', padding: '3px 14px !important' , color: theme.palette.primary.dark,
                                                                        backgroundColor: '#ccddff', fontSize: '13px', borderRadius: '15px' }}>
                                                                    SHTO AUTORIZIM
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
                            <CardActions />
                        </Card>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default UserTypes;