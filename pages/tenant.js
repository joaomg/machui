import Head from 'next/head'
import Link from '../src/Link';

import React from 'react';
import Button from '@material-ui/core/Button';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import Delete from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import MUIDataTable from "mui-datatables";

import TenantEdit from '../src/TenantEdit'
import TenantCreate from '../src/TenantCreate'
import TenantDelete from '../src/TenantDelete';

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:5100/tenant`)
    const tenants = await res.json()

    return { props: { tenants } }
}

function Transition(props) {
    return <Slide {...props} direction="up" />;
}

export function Tenant({ tenants }) {
    const [editOpen, setEditOpen] = React.useState(false)
    const [createOpen, setCreateOpen] = React.useState(false)
    const [deleteOpen, setDeleteOpen] = React.useState(false)
    const [tenant, setTenant] = React.useState(null)
    const [tenantData, setTenantData] = React.useState(tenants)
    const [snack, setSnack] = React.useState({ open: false, message: "" })

    async function fetchData(url = '', method = 'GET', data = {}) {
        const response = await fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
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

    async function saveTenant(tenant) {
        fetchData(`http://localhost:5100/tenant/${tenant.id}`, 'PUT', tenant)
            .then(data => {
                setSnack({ open: true, message: data.msg })
                setEditOpen(false)
                refreshTenants()
            });
    }

    async function createTenant(tenant) {
        fetchData(`http://localhost:5100/tenant`, 'POST', tenant)
            .then(data => {
                setSnack({ open: true, message: data.msg })
                setCreateOpen(false)
                refreshTenants()
            })
            ;
    }

    async function deleteTenant(tenant) {

        fetch(`http://localhost:5100/tenant/${tenant.id}`, {
            method: 'delete'
        })
            .then(response => response.json())
            .then(data => {
                setSnack({ open: true, message: data.msg })
                setDeleteOpen(false)
                refreshTenants()
            }
            )
            .catch(err => console.log(err))
        /*
    fetchData(`http://localhost:5100/tenant/${tenant.id}`, 'DELETE', {})
        .then(data => {
            setSnack({ open: true, message: data.msg })
            setEditOpen(false)
            refreshTenants()
        })
        .then(error => {
            console.log(error)
        });
        */
    }

    async function openDeleteTenant(tenantId) {
        fetch(`http://localhost:5100/tenant/${tenantId}`)
            .then(response => response.json())
            .then(data => {
                setTenant(data)
                setDeleteOpen(true)
            });
    }

    async function getTenant(tenantId) {
        fetch(`http://localhost:5100/tenant/${tenantId}`)
            .then(response => response.json())
            .then(data => {
                setTenant(data)
                setEditOpen(true)
            });
    }

    async function refreshTenants() {
        fetch('http://localhost:5100/tenant')
            .then(response => response.json())
            .then(data => setTenantData(data))
    }

    function handleClose() {
        setSnack({ open: false, message: "" })
    };

    const columns = [
        {
            name: "id",
            label: "Id",
        },
        {
            name: "name",
            label: "Name",
        },
        {
            name: "hash",
            label: "Hash",
            options: {
                display: false,
            }
        },
        {
            name: "id",
            label: " ",
            options: {
                customBodyRender: (value) => {
                    return (
                        <div>
                            <IconButton color="primary" variant="outlined" onClick={() => getTenant(value)}>
                                <EditSharpIcon />
                            </IconButton>
                            <IconButton color="secondary" variant="outlined" onClick={() => openDeleteTenant(value)}>
                                <Delete />
                            </IconButton>
                        </div>
                    )
                }
            }
        },
    ];

    const options = {
        selectableRows: 'none',
        download: false,
        print: false,
        filter: false,
        viewColumns: false,
        pagination: false,
        sort: false,
    };

    return (
        <div>
            <Head>
                <title>Tenant</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container maxWidth="md">
                    <Box m={1}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Welcome to <Link href="/" color="secondary">MACHub!</Link>
                        </Typography>
                        <Paper>
                            <MUIDataTable
                                title={"Tenants"}
                                data={tenantData}
                                columns={columns}
                                options={options}
                            />
                        </Paper>
                    </Box>
                    <Box
                        m="1"
                        display="flex"
                        alignItems="flex-end"
                        justifyContent="flex-end"
                    >
                        <Button variant="contained" onClick={() => setCreateOpen(true)} color="primary">Create</Button>
                    </Box>
                    <TenantEdit
                        open={editOpen}
                        setOpen={setEditOpen}
                        tenant={tenant}
                        saveTenant={saveTenant}
                    />
                    <TenantCreate
                        open={createOpen}
                        setOpen={setCreateOpen}
                        createTenant={createTenant}
                    />
                    <TenantDelete
                        open={deleteOpen}
                        setOpen={setDeleteOpen}
                        tenant={tenant}
                        deleteTenant={deleteTenant}
                    />
                    <Snackbar
                        open={snack.open}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        message={snack.message}
                    />
                </Container>
            </main>
        </div>
    )
}

export default Tenant