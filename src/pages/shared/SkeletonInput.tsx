import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';

export const SkeletonInput = () => {
    const skeletonStyle = {
        '@media screen and (max-width: 600px)': {px: 1},
        text1: {
            width: '18.5rem',
            height: '3rem',
            borderRadius: '15px',
            boxShadow: '0px 5px 22px rgb(0 0 0 / 12%), 0px 0px 0px 0.5px rgb(0 0 0 / 8%)',
            backgroundColor: 'rgb(158 160 162 / 11%)'
        },
        text2: {
            width: '34.5rem',
            height: '6rem',
            borderRadius: '15px',
            '@media screen and (max-width: 600px)': {width: '25rem'},
            boxShadow: '0px 5px 22px rgb(0 0 0 / 12%), 0px 0px 0px 0.5px rgb(0 0 0 / 8%)',
            backgroundColor: 'rgb(158 160 162 / 11%)'
        },
        text3: {
            width: '34.5rem',
            height: '5rem',
            borderRadius: '15px',
            '@media screen and (max-width: 600px)': {width: '25rem'},
            boxShadow: '0px 5px 22px rgb(0 0 0 / 12%), 0px 0px 0px 0.5px rgb(0 0 0 / 8%)',
            backgroundColor: 'rgb(158 160 162 / 11%)'
        },
    }

    return(
        <Stack sx={{...skeletonStyle}}>
            <Skeleton variant="text" sx={{...skeletonStyle.text1}} />
            <Skeleton variant="text" sx={{...skeletonStyle.text2}} />
            <Skeleton variant="text" sx={{...skeletonStyle.text3}} />
        </Stack>
    )
}