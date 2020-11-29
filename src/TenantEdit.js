import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function TenantEdit(props) {
    const { open, setOpen, tenant, saveTenant } = props;

    if (!tenant) return null
    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
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
