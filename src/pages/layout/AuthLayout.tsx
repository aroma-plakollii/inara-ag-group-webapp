import { Box, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import error401 from "../../assets/images/error-401.png";
import logo from "../../assets/images/INARA AG GROUP LOGO.svg";

interface IAuthLayout {
    children: any
}

export const AuthLayout = (props: IAuthLayout) => {
    const { children } = props;

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                height: '100vh'
            }}
        >
            <Grid container sx={{ flex: '1 1 auto' }} >
                <Grid xs={12} lg={6}
                    sx={{
                        backgroundColor: 'background.paper',
                        display: 'flex',
                        flexDirection: 'column',
                        position: 'relative',
                        order: { xs: 2, lg: 1 },
                    }}
                >
                    {children}
                </Grid>

                <Grid
                    xs={12}
                    lg={6}
                    sx={{
                        alignItems: 'center',
                        background: 'black',
                        color: 'white',
                        display: 'flex',
                        justifyContent: 'center',
                        order: { xs: 1, lg: 2 },
                        '& img': {
                            maxWidth: '100%'
                        }
                    }}
                >
                    <Box sx={{p: 3}}>
                        <img
                            alt=""
                            src="/assets/inara-logo-png-1.png"
                            style={{width: '30rem', height: 'auto', objectFit: 'contain'}}
                        />
                        <img
                            alt=""
                            src="/assets/inara-logo-2.png"
                            style={{width: '0', height: 'auto', objectFit: 'contain'}}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};