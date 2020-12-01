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

export default function TenantCreate(props) {
    const { open, setOpen, createTenant } = props;

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <div>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title" fullScreen={fullScreen}>
                <DialogTitle id="form-dialog-title">Create Tenant</DialogTitle>
                <Divider variant="middle" />
                <DialogContent>
                    <DialogContentText>
                        New tenant details, choose the name wisely.
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="tenantName"
                        label="Name"
                        defaultValue="The tenant's name"
                        helperText={`Used to navigate: https://machui.eu/Name`}
                        autoComplete="off"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={() => createTenant({ name: tenantName.value })} color="primary">
                        Create
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
