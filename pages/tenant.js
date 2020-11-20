
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

import useSWR from 'swr'
import theme from '../src/theme';
import TenantEdit from '../src/TenantEdit'
import { makeStyles } from '@material-ui/core/styles';

const fetcher = url => fetch(url).then(res => res.json());

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    mylist: {
        margin: theme.spacing(3, 0, 2),
        paddingInlineStart: 0,
    },
}));

export function Tenant({ tenants }) {
    const classes = useStyles(theme);
    const [tenantEdit, setTenantEdit] = React.useState({
        open: false,
        tenantId: 0,
    });

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
                customBodyRender: (value, tableMeta, updateValue) => {
                    return (
                        <IconButton color="primary" variant="outlined" onClick={() => setTenantEdit({ open: true, tenantId: value })}>
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

    console.log("Tenant!")

    // Here the `fetcher` function will be executed on the client-side.
    const { data } = useSWR('http://localhost:5100/tenant', fetcher)

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
                                title={"Tenants List"}
                                data={data}
                                columns={columns}
                                options={options}
                            />
                        </Paper>
                    </Box>
                    <TenantEdit
                        tenantEdit={tenantEdit}
                        setTenantEdit={setTenantEdit}
                        refreshTenants={refreshTenants}
                    />
                </Container>
            </main>
        </div>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:5100/tenant`)
    const tenants = await res.json()

    return { props: { tenants } }
}

export async function refreshTenants() {
    const res = await fetch(`http://localhost:5100/tenant`)
    const tenants = await res.json()

    console.log("refreshTenants")

    return { props: { tenants } }
}

export default Tenant