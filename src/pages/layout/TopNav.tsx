import { alpha } from '@mui/material/styles';
import { AccountPopover } from './AccountPopover';
import { Avatar, Badge, Box, IconButton, Stack, SvgIcon, Tooltip, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = (props: any) => {
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const user = useSelector((state: RootState) => state.auth.user);

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <>
            <Box
                component="header"
                sx={{
                    backdropFilter: 'blur(6px)',
                    backgroundColor: (theme) => alpha(theme.palette.background.default, 0.8),
                    position: 'sticky',
                    left: {
                        lg: `${SIDE_NAV_WIDTH}px`
                    },
                    top: 0,
                    width: {
                        lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`
                    },
                    zIndex: (theme) => theme.zIndex.appBar
                }}
            >
                <Stack
                    alignItems="center"
                    direction="row"
                    justifyContent="space-between"
                    spacing={2}
                    sx={{
                        minHeight: TOP_NAV_HEIGHT,
                        px: 2
                    }}
                >
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                    >
                        {!lgUp && (
                            <MenuIcon onClick={props.onNavOpen}/>
                        )}
                    </Stack>
                    <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                    >
                        <Avatar
                            onClick={handleClick}
                            sx={{
                                cursor: 'pointer',
                                height: 40,
                                width: 40
                            }}
                            src="/assets/avatars/avatar-anika-visser.png"
                        />
                    </Stack>
                </Stack>
            </Box>
            <AccountPopover
                anchorEl={anchorEl}
                open={open}
                id={id}
                closePopover={handleClose}
                name={`${user?.firstName} ${user?.lastName}`}
                idUser={user?.idUser}
            />
        </>
    );
};