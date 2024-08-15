import {Box, Button, Card, CardActions, CardContent, CardHeader, Divider, TextField, Unstable_Grid2 as Grid } from '@mui/material';
import {Layout} from "../layout/Layout";
import {Link, useNavigate} from "react-router-dom";
import theme from "../../theme/theme";
import {ChangeEvent, useState} from "react";
import {UserType} from "../../types/userType";
import {userTypeCreate} from "../../api/userTypeService";
import { useHeaders } from '../../hooks/useHeaders';

export const AddUserType = () => {
    const navigate = useNavigate();
    const [userType, setUserType] = useState<UserType>();
    const [error, setError] = useState<boolean>(false);
    const headers = useHeaders();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserType({ ...userType, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(false)

        if (!userType?.typeName){
            setError(false);
            return;
        }

        try{
            const res = await userTypeCreate(userType, headers);

            if(res){
                navigate('/authorizations');
            }
        }catch(error) {
            console.error('UserType create failed', error);
        }
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
                            title="Shto Llojin e Përdoruesit"
                        />
                        <CardContent sx={{pt: 0}}>
                            <Box sx={{m: -1.5}}>
                                <Grid
                                    container
                                    spacing={3}
                                >
                                    <Grid
                                        xs={12}
                                    >
                                        <TextField
                                            fullWidth
                                            error={error}
                                            label="Emri"
                                            name="typeName"
                                            type='text'
                                            onChange={handleChange}
                                            value={userType?.typeName}
                                            variant="outlined"
                                            InputLabelProps={{
                                                shrink: userType?.typeName ? true : false,
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                        <Divider/>
                        <CardActions sx={{justifyContent: 'right', pt: 2}}>
                            <Link to={`/authorizations`}>
                                <Button variant="contained" sx={{ backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600]}, }}>
                                    Anulo
                                </Button>
                            </Link>
                            <Button variant="contained" type="submit">
                                Ruaj
                            </Button>
                        </CardActions>
                    </Card>
                </form>
            </Box>
        </Layout>
    )
}