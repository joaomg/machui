import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme, withStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

const DeleteButton = withStyles((theme) => ({
    root: {
        color: red[500]
    },
}))(Button);

export default function TenantDelete(props) {
    const { open, setOpen, tenant, deleteTenant } = props;
    const [disabled, setDisabled] = React.useState(true)

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    
    if (!tenant) return null
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
                <DialogTitle id="form-dialog-title">Delete {tenant.name}?</DialogTitle>
                <Divider variant="middle" />
                <DialogContent>
                    <DialogContentText>
                        Just to make sure, fill in the tenant's name for deletion.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="tenantName"
                        label="Name"
                        helperText="Yes, it's case-sensitive!"
                        autoComplete="off"
                        onChange={(event) => setDisabled(event.target.value !== tenant.name)}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setOpen(false)}
                        color="primary">
                        Cancel
                    </Button>
                    <DeleteButton
                        onClick={() => { deleteTenant({ id: tenant.id, name: tenantName.value }); tenantName.value=''; setDisabled(true) } }
                        disabled={disabled}
                    >
                        Delete
                    </DeleteButton>
                </DialogActions>
            </Dialog>
        </div>
    );
}
