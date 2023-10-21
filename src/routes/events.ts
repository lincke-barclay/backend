import express from "express"
import providePGEventsDS from "../data/events"
import POSTEventRequestDTO from "@/data/events/source/models/network/POSTEventRequestDTO"

const router = express.Router()
const eventsDS = providePGEventsDS()

router.get('/:eventId', (req, res) => {
    const eventId = Number(req.params.eventId)
    eventsDS.getSingleEvent(eventId).then((event) => {
        res.status(200).json(event)
    })
})

router.post('/', (req, res) => {
    const eventReq = postBodyToPOSTEventRequestDTO(req.body)
    eventsDS.addEvent(eventReq).then((eventResp) => {
        res.status(200).json(eventResp)
    })
})

router.delete('/:eventId', (req, res) => {
    const eventId = Number(req.params.eventId)
    eventsDS.deleteEvent(eventId).then(() => {
        res.status(204).send()
    })
})

function postBodyToPOSTEventRequestDTO(body: any): POSTEventRequestDTO {
    console.log(body.startingDateTime)
    console.log(body.endingDateTime)
    return {
        title: body.title,
        shortDescription: body.shortDescription,
        longDescription: body.longDescription,
        firebaseOwnerId: body.firebaseOwnerId,
        startingDateTime: new Date(Date.parse(body.startingDateTime)),
        endingDateTime: new Date(Date.parse(body.endingDateTime))
    }
}

export default router