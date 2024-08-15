import {
    Box,
    Button,
    Divider,
    Drawer,
    Stack,
    SvgIcon,
    Typography,
    useMediaQuery
} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';
import { Scrollbar } from './ScrollBar';
import theme from "../../theme/theme";
import SearchIcon from '@mui/icons-material/Search';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket'
import { SideNavItem } from './SideNavItems';
import {useSelector} from "react-redux";
import {RootState} from "../../app/store";

export const SideNav = (props: any) => {
    const { open, onClose } = props;
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const user = useSelector((state: RootState) => state.auth.user );
    const location = useLocation();
    const pathname = location.pathname;

    const content = (
        <Scrollbar
            sx={{
                background: `${theme.palette.grey[900]} !important`,
                overflow: 'hidden',
                '& .simplebar-scrollbar:before': {
                    background: `${theme.palette.grey[900]} !important`
                }
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                }}
            >
                <Box pl={3} pr={3}>
                    <Link to={'/home'}>
                        <Box
                            sx={{
                                display: 'inline-flex',
                                height: 110,
                                width: '100%',
                                boxSizing: 'border-box'
                            }}
                        >
                            <img
                                src="/assets/inara-logo-png-1.png"
                                alt="Lockup"
                                style={{width: '100%', height: '100%', objectFit: 'contain', paddingTop: '1rem'
                                , paddingBottom: '1rem'}}
                            />
                        </Box>
                    </Link>
                </Box>
                <Divider sx={{borderColor: theme.palette.grey[700]}}/>
                <Box
                    component="nav"
                    sx={{
                        flexGrow: 1,
                        px: 2,
                        py: 4
                    }}
                >
                    <Stack
                        component="ul"
                        spacing={0.5}
                        sx={{
                            listStyle: 'none',
                            p: 0,
                            m: 0
                        }}
                    >
                        <SideNavItem
                            active={pathname === '/home'}
                            icon={<SearchIcon />}
                            path="/home"
                            title="Kërko"
                        />
                        <SideNavItem
                            active={pathname === '/clients'}
                            icon={<GroupIcon />}
                            path="/clients"
                            title="Klientët"
                        />
                        <SideNavItem
                            active={pathname === '/bookings'}
                            icon={<AirplaneTicketIcon />}
                            path="/bookings"
                            title="Rezervimet"
                        />
                        {user?.userRole === 'SUPERADMIN' && (
                            <>
                                <SideNavItem
                                    active={pathname === '/invoices'}
                                    icon={<ReceiptLongIcon />}
                                    path="/invoices"
                                    title="Faturat"
                                />
                                <SideNavItem
                                    active={pathname === '/users'}
                                    icon={<PersonIcon />}
                                    path="/users"
                                    title="Përdoruesit"
                                />
                            </>
                        )}

                    </Stack>
                </Box>
                <Divider sx={{ borderColor: theme.palette.grey[700] }} />
            </Box>
        </Scrollbar>
    );

    if (lgUp) {
        return (
            <Drawer
                anchor="left"
                open
                PaperProps={{
                    sx: {
                        backgroundColor: theme.palette.grey[900],
                        color: 'common.white',
                        width: 280
                    }
                }}
                variant="permanent"
            >
                {content}
            </Drawer>
        );
    }

    return (
        <Drawer
            anchor="left"
            onClose={onClose}
            open={open}
            PaperProps={{
                sx: {
                    backgroundColor: theme.palette.grey[900],
                    color: 'common.white',
                    width: 280
                }
            }}
            sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
            variant="temporary"
        >
            {content}
        </Drawer>
    );
};