// src/theme.ts
import { createTheme, Theme} from '@mui/material/styles';
import {
    filledInputClasses,
    inputLabelClasses,
    outlinedInputClasses,
    paperClasses,
    tableCellClasses,
} from '@mui/material';
import { common } from '@mui/material/colors';
import { alpha } from '@mui/material/styles';
import { error, indigo, info, neutral, success, warning } from './colors';

const muiTheme = createTheme();

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1440
        }
    },
    shadows: [
        'none',
        '0px 1px 2px rgba(0, 0, 0, 0.08)',
        '0px 1px 5px rgba(0, 0, 0, 0.08)',
        '0px 1px 8px rgba(0, 0, 0, 0.08)',
        '0px 1px 10px rgba(0, 0, 0, 0.08)',
        '0px 1px 14px rgba(0, 0, 0, 0.08)',
        '0px 1px 18px rgba(0, 0, 0, 0.08)',
        '0px 2px 16px rgba(0, 0, 0, 0.08)',
        '0px 3px 14px rgba(0, 0, 0, 0.08)',
        '0px 3px 16px rgba(0, 0, 0, 0.08)',
        '0px 4px 18px rgba(0, 0, 0, 0.08)',
        '0px 4px 20px rgba(0, 0, 0, 0.08)',
        '0px 5px 22px rgba(0, 0, 0, 0.08)',
        '0px 5px 24px rgba(0, 0, 0, 0.08)',
        '0px 5px 26px rgba(0, 0, 0, 0.08)',
        '0px 6px 28px rgba(0, 0, 0, 0.08)',
        '0px 6px 30px rgba(0, 0, 0, 0.08)',
        '0px 6px 32px rgba(0, 0, 0, 0.08)',
        '0px 7px 34px rgba(0, 0, 0, 0.08)',
        '0px 7px 36px rgba(0, 0, 0, 0.08)',
        '0px 8px 38px rgba(0, 0, 0, 0.08)',
        '0px 8px 40px rgba(0, 0, 0, 0.08)',
        '0px 8px 42px rgba(0, 0, 0, 0.08)',
        '0px 9px 44px rgba(0, 0, 0, 0.08)',
        '0px 9px 46px rgba(0, 0, 0, 0.08)'
    ],
    palette: {
        action: {
            active: neutral[500],
            disabled: alpha(neutral[900], 0.38),
            disabledBackground: alpha(neutral[900], 0.12),
            focus: alpha(neutral[900], 0.16),
            hover: alpha(neutral[900], 0.04),
            selected: alpha(neutral[900], 0.12)
        },
        background: {
            default: common.white,
            paper: common.white
        },
        divider: '#F2F4F7',
        error,
        info,
        mode: 'light',
        grey: {
            ...neutral
        },
        primary: indigo,
        success,
        text: {
            primary: neutral[900],
            secondary: neutral[500],
            disabled: alpha(neutral[900], 0.38)
        },
        warning
    },
    shape: {
        borderRadius: 8
    },
    typography: {
        fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.57
        },
        button: {
            fontWeight: 600
        },
        caption: {
            fontSize: '0.75rem',
            fontWeight: 500,
            lineHeight: 1.66
        },
        subtitle1: {
            fontSize: '1rem',
            fontWeight: 500,
            lineHeight: 1.57
        },
        subtitle2: {
            fontSize: '0.875rem',
            fontWeight: 500,
            lineHeight: 1.57
        },
        overline: {
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.5px',
            lineHeight: 2.5,
            textTransform: 'uppercase'
        },
        h1: {
            fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 700,
            fontSize: '3.5rem',
            lineHeight: 1.2
        },
        h2: {
            fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 700,
            fontSize: '3rem',
            lineHeight: 1.2
        },
        h3: {
            fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 700,
            fontSize: '2.25rem',
            lineHeight: 1.2
        },
        h4: {
            fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 700,
            fontSize: '2rem',
            lineHeight: 1.2
        },
        h5: {
            fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 700,
            fontSize: '1.5rem',
            lineHeight: 1.2
        },
        h6: {
            fontFamily: '\'Plus Jakarta Sans\', sans-serif',
            fontWeight: 700,
            fontSize: '1.125rem',
            lineHeight: 1.2
        }
    },
    components: {
        MuiAvatar: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 600,
                    letterSpacing: 0
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '12px',
                    textTransform: 'none'
                },
                sizeSmall: {
                    padding: '6px 16px'
                },
                sizeMedium: {
                    padding: '8px 20px'
                },
                sizeLarge: {
                    padding: '11px 24px'
                },
                textSizeSmall: {
                    padding: '7px 12px'
                },
                textSizeMedium: {
                    padding: '9px 16px'
                },
                textSizeLarge: {
                    padding: '12px 16px'
                }
            }
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 20,
                    [`&.${paperClasses.elevation1}`]: {
                        boxShadow: '0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)'
                    }
                }
            }
        },
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: '32px 24px',
                    '&:last-child': {
                        paddingBottom: '32px'
                    }
                }
            }
        },
        MuiCardHeader: {
            defaultProps: {
                titleTypographyProps: {
                    variant: 'h6'
                },
                subheaderTypographyProps: {
                    variant: 'body2'
                }
            },
            styleOverrides: {
                root: {
                    padding: '32px 24px 16px'
                }
            }
        },
        MuiCssBaseline: {
            styleOverrides: (theme) => ({
                '*': {
                    boxSizing: 'border-box'
                },
                html: {
                    MozOsxFontSmoothing: 'grayscale',
                    WebkitFontSmoothing: 'antialiased',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                body: {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    minHeight: '100%',
                    width: '100%'
                },
                '#__next': {
                    display: 'flex',
                    flex: '1 1 auto',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%'
                },
                '#nprogress': {
                    pointerEvents: 'none'
                },
                '#nprogress .bar': {
                    backgroundColor: theme.palette.primary.main,
                    height: 3,
                    left: 0,
                    position: 'fixed',
                    top: 0,
                    width: '100%',
                    zIndex: 2000
                }
            })
        },
        MuiInputBase: {
            styleOverrides: {
                input: {
                    '&::placeholder': {
                        opacity: 1
                    }
                }
            }
        },
        MuiInput: {
            styleOverrides: {
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                    '&::placeholder': {
                        color: (theme: any) => theme.palette.text.secondary,
                    }
                }
            }
        },
        MuiFilledInput: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    backgroundColor: 'transparent',
                    borderRadius: 8,
                    borderStyle: 'solid',
                    borderWidth: 1,
                    overflow: 'hidden',
                    borderColor: theme.palette.grey[200],
                    transition: muiTheme.transitions.create(['border-color', 'box-shadow']),
                    '&:hover': {
                        backgroundColor: theme.palette.action.hover
                    },
                    '&:before': {
                        display: 'none'
                    },
                    '&:after': {
                        display: 'none'
                    },
                    [`&.${filledInputClasses.disabled}`]: {
                        backgroundColor: 'transparent'
                    },
                    [`&.${filledInputClasses.focused}`]: {
                        backgroundColor: 'transparent',
                        borderColor: theme.palette.primary.main,
                        boxShadow: `${theme.palette.primary.main} 0 0 0 2px`
                    },
                    [`&.${filledInputClasses.error}`]: {
                        borderColor: theme.palette.error.main,
                        boxShadow: `${theme.palette.error.main} 0 0 0 2px`
                    }
                }),
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px'
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                // root: ({ theme }: { theme: Theme }) => ({
                //     '&:hover': {
                //         backgroundColor: theme.palette.action.hover,
                //         [`& .${outlinedInputClasses.notchedOutline}`]: {
                //             borderColor: theme.palette.grey[200]
                //         }
                //     },
                //     [`&.${outlinedInputClasses.focused}`]: {
                //         backgroundColor: 'transparent',
                //         [`& .${outlinedInputClasses.notchedOutline}`]: {
                //             borderColor: theme.palette.primary.main,
                //             boxShadow: `${theme.palette.primary.main} 0 0 0 2px`
                //         }
                //     },
                //     [`&.${filledInputClasses.error}`]: {
                //         [`& .${outlinedInputClasses.notchedOutline}`]: {
                //             borderColor: theme.palette.error.main,
                //             boxShadow:`${theme.palette.error.main} 0 0 0 2px`
                //         }
                //     },
                //     notchedOutline: {
                //         borderColor: theme.palette.grey[200],
                //         transition: muiTheme.transitions.create([
                //             'border-color',
                //             'box-shadow'
                //         ])
                //     },
                // }),
                input: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '24px',
                },
            }
        },
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    [`&.${inputLabelClasses.filled}`]: {
                        transform: 'translate(12px, 18px) scale(1)'
                    },
                    [`&.${inputLabelClasses.shrink}`]: {
                        [`&.${inputLabelClasses.standard}`]: {
                            transform: 'translate(0, -1.5px) scale(0.85)'
                        },
                        [`&.${inputLabelClasses.filled}`]: {
                            transform: 'translate(12px, 6px) scale(0.85)'
                        },
                        [`&.${inputLabelClasses.outlined}`]: {
                            transform: 'translate(14px, -9px) scale(0.85)'
                        }
                    }
                }
            }
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: 1.71,
                    minWidth: 'auto',
                    paddingLeft: 0,
                    paddingRight: 0,
                    textTransform: 'none',
                    '& + &': {
                        marginLeft: 24
                    }
                }
            }
        },
        MuiTableCell: {
            styleOverrides: {
                root: ({ theme }: { theme: Theme }) => ({
                    borderBottomColor: theme.palette.divider,
                    padding: '15px 16px',
                }),
            },
        },
        MuiTableHead: {
            styleOverrides: {
                root: {
                    borderBottom: 'none',
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none',
                        backgroundColor: (theme: any) => theme.palette.neutral[50],
                        color: (theme: any) => theme.palette.neutral[700],
                        fontSize: 12,
                        fontWeight: 600,
                        lineHeight: 1,
                        letterSpacing: 0.5,
                        textTransform: 'uppercase'
                    },
                    [`& .${tableCellClasses.paddingCheckbox}`]: {
                        paddingTop: 4,
                        paddingBottom: 4
                    }
                }
            }
        },
        MuiTextField: {
            defaultProps: {
                variant: 'filled'
            }
        }
    }
});

export default theme;
