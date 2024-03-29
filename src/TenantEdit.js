import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';


export default function TenantEdit(props) {
    const { open, setOpen, tenant, saveTenant } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    if (!tenant) return null
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
                <DialogTitle id="form-dialog-title">Edit Tenant</DialogTitle>
                <Divider variant="middle" />
                <DialogContent>
                    <DialogContentText>
                        The tenant details, choose the name wisely.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="tenantName"
                        label="Name"
                        defaultValue={tenant.name}
                        helperText={`Used to navigate: https://machui.eu/${tenant.name}`}
                        autoComplete="off"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => saveTenant({ id: tenant.id, name: tenantName.value })} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
