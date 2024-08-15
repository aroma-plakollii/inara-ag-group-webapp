import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import {Layout} from "../layout/Layout";

export const SkeletonTable = () => {
    const skeletonStyle = {
        py: 8,
        px: 15,
        '@media screen and (max-width: 1600px)': {px: 3},
        rectangular: {
            minWidth: '800',
            height: '60vh',
            borderRadius: '20px',
            boxShadow: '0px 5px 22px rgb(0 0 0 / 12%), 0px 0px 0px 0.5px rgb(0 0 0 / 8%)',
            backgroundColor: 'rgb(158 160 162 / 11%)'
        },
    }

    return(
        <Layout>
            <Stack spacing={1} sx={{...skeletonStyle}}>
                <Skeleton variant="rectangular" sx={{...skeletonStyle.rectangular}} />
            </Stack>
        </Layout>
    )
}