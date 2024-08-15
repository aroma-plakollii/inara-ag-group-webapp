import { Box, ButtonBase } from '@mui/material';
import theme from "../../theme/theme";
import {Link} from "react-router-dom";

interface ISideNavItem {
    active: boolean,
    icon: any,
    path: string,
    title: string
}

export const SideNavItem = (props: ISideNavItem) => {

    return (
        <li>
            <ButtonBase
                component={Link}
                to={props.path}
                sx={{
                    alignItems: 'center',
                    borderRadius: 1,
                    display: 'flex',
                    justifyContent: 'flex-start',
                    pl: '16px',
                    pr: '16px',
                    py: '6px',
                    textAlign: 'left',
                    width: '100%',
                    ...(props.active && {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }),
                    '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.04)'
                    }
                }}
            >
                {props.icon && (
                    <Box
                        component="span"
                        sx={{
                            alignItems: 'center',
                            color: 'neutral.400',
                            display: 'inline-flex',
                            justifyContent: 'center',
                            mr: 2,
                            ...(props.active && {
                                color: 'primary.main'
                            })
                        }}
                    >
                        {props.icon}
                    </Box>
                )}
                <Box
                    component="span"
                    sx={{
                        color: 'neutral.400',
                        flexGrow: 1,
                        fontFamily: (theme) => theme.typography.fontFamily,
                        fontSize: 14,
                        fontWeight: 600,
                        lineHeight: '24px',
                        whiteSpace: 'nowrap',
                        ...(props.active && {
                            color: 'common.white'
                        }),
                    }}
                >
                    {props.title}
                </Box>
            </ButtonBase>
        </li>
    );
};