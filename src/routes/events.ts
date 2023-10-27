import express from "express"
import { POSTEventRequestDTO } from "./models/Events"
import { addEvent, deleteEvent, getEventById } from "../domain/events"
import { provideAuthenticator } from "../security"

const router = express.Router()
const authenticator = provideAuthenticator()

router.get('/:eventId', (req, res, next) => {
    authenticator.executeWithAuthenticationOrThrow(req.headers.authorization, () => {
        const eventId = Number(req.params.eventId)
        getEventById(eventId).then(event => {
            res.status(200).json(event)
        })
    }).catch(next)
})

router.post('/', (req, res, next) => {
    authenticator.executeWithAuthenticationOrThrow(req.headers.authorization, () => {
        const eventReq = postBodyToPOSTEventRequestDTO(req.body)
        addEvent(eventReq).then(event => {
            res.status(200).json(event)
        })
    }).catch(next)
})

router.delete('/:eventId', (req, res, next) => {
    authenticator.executeWithAuthenticationOrThrow(req.headers.authorization, () => {
        const eventId = Number(req.params.eventId)
        deleteEvent(eventId).then(event => {
            res.status(204).send()
        })
    }).catch(next)
})

function postBodyToPOSTEventRequestDTO(body: any): POSTEventRequestDTO {
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