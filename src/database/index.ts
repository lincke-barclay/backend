import {Pool} from 'pg';

const pool = new Pool({
    host: 'localhost',
    user: process.env.POSTGRES_USERNAME,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_PASSWORD,
    port: 5432,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test connection fail
pool.query("SELECT 1").then(() => {
    console.log("Connection worked")
})

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
