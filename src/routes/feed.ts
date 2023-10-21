import express from "express"
import providePGEventsDS from "../data/events"

const router = express.Router()
const eventsDS = providePGEventsDS()

router.get('/', (req, res) => {
    eventsDS.getAllEvents().then((events) => {
        res.status(200).json(events)
    })
})

export default router