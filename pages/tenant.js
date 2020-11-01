import Head from 'next/head'
import styles from '../styles/Home.module.css'
import useSWR from 'swr'

const fetcher = url => fetch(url).then(res => res.json());

function GetTenants() {
    const { data, error } = useSWR('http://localhost:5100/tenant', fetcher)

    if (error) return <div>failed to load</div>
    if (!data) return <div>loading...</div>
    return (
        <ul>
            {data.map((tenant) => (
                <li>
                    <h3>{tenant.name}</h3>
                    <p>{tenant.id}</p>
                    <p>{tenant.hash}</p>
                    <p>{tenant.hashShort}</p>
                </li>
            ))}
        </ul>
    )
}

export async function getServerSideProps() {
    const res = await fetch(`http://localhost:5100/tenant`)
    const tenants = await res.json()

    return { props: { tenants } }
}

export default function Tenant({ tenants }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Tenant</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Welcome to <a href="https://machub.io">MACHub!</a>
                </h1>
            </main>

            <ul>
                {tenants.map((tenant) => (
                    <li>
                        <h3>{tenant.name}</h3>
                        <p>{tenant.id}</p>
                        <p>{tenant.hash}</p>
                        <p>{tenant.hashShort}</p>
                    </li>
                ))}
            </ul>

            <GetTenants />

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '} MACHub
        </a>
            </footer>
        </div>
    )
}
