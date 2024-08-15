import { useCallback } from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { logoutUser } from '../../api/authService';
import {Link, useNavigate} from 'react-router-dom';
import {RootState} from "../../app/store";

interface IAccountPopover {
    anchorEl: Element | null;
    open: boolean;
    id: string | undefined;
    closePopover: () => void;
    name: string;
    idUser: number | undefined;
}
export const AccountPopover = (props: IAccountPopover) => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleLogout = async () => {
        const res = await logoutUser()
        
        if(!res.isAuthenticated){
            dispatch(logout());
            sessionStorage.removeItem('auth');
            // window.location.reload();
            navigate('/login')
        }
    }

    return (
        <Popover
            anchorEl={props.anchorEl}
            anchorOrigin={{
                horizontal: 'left',
                vertical: 'bottom'
            }}
            onClose={props.closePopover}
            open={props.open}
            id={props.id}
            PaperProps={{ sx: { width: 200 } }}
        >
            <Box
                sx={{
                    py: 1.5,
                    px: 2
                }}
            >
                <Typography variant="overline">
                    Llogaria
                </Typography>
                <Typography
                    color="text.secondary"
                    variant="body2"
                >
                    {props.name}
                </Typography>
            </Box>
            <Divider />
            <MenuList
                disablePadding
                dense
                sx={{
                    p: '8px',
                    '& > *': {
                        borderRadius: 1
                    }
                }}
            >
                <Link to={`/users/${props.idUser}`} style={{textDecoration: 'none', color: 'black'}}>
                    <MenuItem>
                        Ndrysho Profilin
                    </MenuItem>
                </Link>
                <MenuItem onClick={handleLogout} >
                    Shkyçu
                </MenuItem>
            </MenuList>
        </Popover>
    );
};