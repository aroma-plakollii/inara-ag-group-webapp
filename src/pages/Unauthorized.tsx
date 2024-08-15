import {Layout} from "./layout/Layout";
import {
    Box,
    Button,
    Container,
    Stack,
    Typography,

} from '@mui/material';
import {Link} from "react-router-dom";
import error401 from '../assets/images/error-401.png'
import { Home } from "@mui/icons-material";

const Unauthorized = () => {
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

                    <Box
                            component="main"
                            sx={{
                            alignItems: 'center',
                            display: 'flex',
                            flexGrow: 1,
                            py: '80px',
                            }}
                        >
                            <Container maxWidth="lg">
                            <Typography
                                align="center"
                                variant="h4"
                            >
                                401: Kërkohet Autorizim
                            </Typography>

                            <Box
                                sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mb: 6,
                                }}
                            >
                                <Box
                                alt="Not Authorized"
                                component="img"
                                src={error401}
                                sx={{
                                    height: 'auto',
                                    maxWidth: '100%',
                                    width: 400,
                                }}
                                />
                            </Box>
                            
                            
                            <Box
                                sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                mt: 6,
                                }}
                            >
                                <Link to={`/home`}>
                                <Button> Kthehu prapa! </Button>
                            </Link>
                            </Box>

                            </Container>
                        </Box>
                    </Stack>
                </Container>
            </Box>
        </Layout>
    );
}

export default Unauthorized