
import Head from 'next/head'
import Link from '../src/Link';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import useSWR from 'swr'
import theme from '../src/theme';
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


function GetTenants() {
    const { data, error } = useSWR('http://localhost:5100/tenant', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <List className={classes.mylist}>
            {data.map((tenant) => (
                <ListItem key={tenant.id}>
                    <ListItemText
                        primary="Single-line item"
                        secondary={secondary ? 'Secondary text' : null}
                    />
                </ListItem>
            ))}
        </List>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:5100/tenant`)
    const tenants = await res.json()

    return { props: { tenants } }
}

export default function Tenant({ tenants }) {
    const classes = useStyles(theme);

    return (
        <div>
            <Head>
                <title>Tenant</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Container maxWidth="sm">
                    <Box my={10}>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Welcome to <Link href="/" color="secondary">MACHub!</Link>
                        </Typography>
                    </Box>
                    <Paper>
                        <List className={classes.mylist}>
                            {tenants.map((tenant) => (
                                <ListItem key={tenant.id}>
                                    <ListItemText
                                        primary={tenant.name}
                                        secondary={tenant.hash}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Container>
            </main>
        </div>
    )
}
