import Head from 'next/head'
import Link from '../src/Link';

import React from 'react';
import EditSharpIcon from '@material-ui/icons/EditSharp';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import MUIDataTable from "mui-datatables";

import TenantEdit from '../src/TenantEdit'

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:5100/tenant`)
    const tenants = await res.json()

    return { props: { tenants } }
}

export function Tenant({ tenants }) {
    const [open, setOpen] = React.useState(false)
    const [tenant, setTenant] = React.useState(null)
    const [tenantData, setTenantData] = React.useState(tenants)

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
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

    async function saveTenant(tenant) {
        postData(`http://localhost:5100/tenant/${tenant.id}`, tenant)
            .then(data => {
                getTenants();
                getTenant(tenant.id)
            });
    }

    async function getTenant(tenantId) {
        fetch(`http://localhost:5100/tenant/${tenantId}`)
            .then(response => response.json())
            .then(data => {
                setTenant(data);
                setOpen(true)
            });
    }

    async function getTenants() {
        fetch('http://localhost:5100/tenant')
            .then(response => response.json())
            .then(data => setTenantData(data));
    }

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
        },
        {
            name: "id",
            label: " ",
            options: {
                customBodyRender: (value) => {
                    return (
                        <IconButton color="primary" variant="outlined" onClick={() => getTenant(value)}>
                            <EditSharpIcon />
                        </IconButton>
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
                    <Box my={10}>
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
                    <TenantEdit
                        open={open}
                        setOpen={setOpen}
                        tenant={tenant}
                        saveTenant={saveTenant}
                    />
                </Container>
            </main>
        </div>
    )
}

export default Tenant