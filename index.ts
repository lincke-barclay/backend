import dotenv from "dotenv";
dotenv.config()

import express from 'express';
import { json, urlencoded } from 'body-parser';
import providePGEventsDS from "./src/data/events"

/**
 * Import Routes
 */
import feedRoutes from "./src/routes/feed"
import eventRoutes from "./src/routes/events"

/**
 * Get variables
 */
const port = process.env.PORT
const app = express();

/**
 * Configure App
 */
app.use(json())
app.use(urlencoded({ extended: false }));

/**
 * Routes
 */
app.use('/feed', feedRoutes)
app.use('/events', eventRoutes)

/** 

*/
/**
 * Start App
 */
const server = app.listen(port, function () {
    console.log(`Server is running at ${port}`)
})
