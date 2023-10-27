import { Pool, QueryConfig, QueryResult } from 'pg';

const pool = new Pool({
    host: 'localhost',
    user: 'theolincke',
    database: 'events',
    password: 'postgres',
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on('connect', (client) => {
    console.log("Connected to Database !")
})
pool.on('acquire', (client) => {
    console.log("Client Checked out")
})
pool.on('error', (err, client) => {
    console.log("Error acquiring client: ", err.stack)
})

export default function providePool() {
    return pool
}
