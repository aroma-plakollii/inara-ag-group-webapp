import {Button, Card, CardActions, CardContent, CardHeader, Modal, Typography} from '@mui/material';
import theme from "../../theme/theme";
interface IAlertConfirmProps {
    title: string,
    message: string
    isOpen: boolean;
    onClose: (confirm: any) => void;
}

const AlertConfirm = (props: IAlertConfirmProps) => {

    return (
        <Modal open={props.isOpen} onClose={() => props.onClose('cancel')}
               sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description" >
            <Card sx={{width: '30%'}}>
                <CardHeader
                    title={`${props.title}`}
                />
                <CardContent>
                    <Typography variant="body2">
                        {props.message}
                    </Typography>
                </CardContent>
                <CardActions sx={{display: 'flex', justifyContent: 'flex-end'}}>
                    <Button variant="outlined" sx={{ color: 'white', borderColor: theme.palette.grey[500], backgroundColor: theme.palette.grey[500], '&:hover': {backgroundColor: theme.palette.grey[600], borderColor: theme.palette.grey[500],}}} onClick={() => props.onClose('cancel')}>
                        Anulo
                    </Button>
                    <Button variant="contained" color="primary" onClick={() => props.onClose('confirm')}>
                        Fshij
                    </Button>
                </CardActions>
            </Card>
        </Modal>
    );
}

export default AlertConfirm;