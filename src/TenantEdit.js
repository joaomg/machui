import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json());

function getTenant(id) {
    const { data, error } = useSWR(`http://localhost:5100/tenant/${id}`, fetcher)

    return {
        tenant: data,
        isLoading: !error && !data,
        isError: error
    }
}

function Tenant(id) {
    const { tenant, isLoading, isError } = getTenant(id)
    // if (isLoading) return '<Spinner />'
    // if (isError) return '<Error />'
    if (isLoading) return null
    if (isError) return null
    return tenant
}

async function saveTenant(tenantId) {
    let data = { id: tenantId, name: tenantName.value }

    const response = await fetch(`http://localhost:5100/tenant/${tenantId}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
}

export default function TenantEdit(props) {
    const { tenantEdit, setTenantEdit, refreshTenants } = props;

    let tenant = tenantEdit.tenantId == 0 ? null : Tenant(tenantEdit.tenantId);

    if (tenant === null) {
        return null
    } else {

        return (
            <div>
                <Dialog open={tenantEdit.open} onClose={() => setTenantEdit({ open: false, tenantId: 0 })} aria-labelledby="form-dialog-title">
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
                        <Button onClick={() => setTenantEdit({ open: false, tenantId: 0 })} color="primary">
                            Cancel
                    </Button>
                        <Button onClick={() => { saveTenant(tenantEdit.tenantId); setTenantEdit({ open: false, tenantId: 0 }); refreshTenants(); }} color="primary">
                            Save
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}