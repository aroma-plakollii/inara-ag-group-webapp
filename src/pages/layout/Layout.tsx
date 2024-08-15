import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { SideNav } from './SideNav';
import { TopNav } from './TopNav';

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled('div')(({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    [theme.breakpoints.up('lg')]: {
        paddingLeft: SIDE_NAV_WIDTH
    }
}));

const LayoutContainer = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    width: '100%'
});

interface IAuthLayout {
    children: any
}

export const Layout = (props: IAuthLayout) => {
    const [openNav, setOpenNav] = useState(false);

    return (
        <>
            <TopNav onNavOpen={() => setOpenNav(true)} />
            <SideNav
                onClose={() => setOpenNav(false)}
                open={openNav}
            />
            <LayoutRoot>
                <LayoutContainer>
                    {props.children}
                </LayoutContainer>
            </LayoutRoot>
        </>
    );
};