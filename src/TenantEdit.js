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

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return data
}

export default function TenantEdit(props) {
  const { tenant, setTenant } = props;

  let tenantDetails = tenant.tenantId == 0 ? {} : getTenant(tenant.tenantId);

  return (
    <div>
      <Dialog open={tenant.open} onClose={() => setTenant({ open: false, tenantId: 0 })} aria-labelledby="form-dialog-title">
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
            defaultValue={tenantDetails.name}
            helperText={ `Used to navigate: https://machui.eu/${tenantDetails.name}` }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setTenant({ open: false, tenantId: 0 })} color="primary">
            Cancel
          </Button>
          <Button onClick={() => setTenant({ open: false, tenantId: 0 })} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}