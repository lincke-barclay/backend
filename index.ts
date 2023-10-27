import dotenv from "dotenv";
dotenv.config()

import express, { NextFunction } from 'express';
import { json, urlencoded } from 'body-parser';
import { installFirebaseApp } from "./src/plugins/firebase";

/**
 * Import Routes
 */
import feedRoutes from "./src/routes/feed"
import eventRoutes from "./src/routes/events"
import userRoutes from "./src/routes/users"
import { errorHandler } from "./src/errors/handler";

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
app.use('/users', userRoutes)

// Configure error handler
app.use(errorHandler)

/**
 * Stuff to do before running
 */
installFirebaseApp()

/**
 * Start App
 */
const server = app.listen(port, () => {
    console.log(`Server is running at ${port}`)
})
