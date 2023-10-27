import express from "express"
import { addEvent, deleteEvent, getEventById } from "../domain/events"
import { EventState } from "../data/models/Events"
import { guardAuthenticated } from "./util"
import { POSTEventRequestResultState } from "../data/sources/models/DatabaseEventModels"
import { ParsedStatus, postBodyToPOSTEventRequestDTO } from "./transforms/RouterEventTransforms"

const router = express.Router()

router.get('/:eventId', (req, res, next) => {
    guardAuthenticated(req, res, (uid) => {
        const eventId = Number(req.params.eventId)
        getEventById(eventId).then(eventResult => {
            if (eventResult.state === EventState.DoesntExist) {
                res.status(404).send()
                return
            }

            const event = eventResult.event!!
            if (event.organizer.firebaseOwnerId !== uid) {
                res.status(404).send() // Err on 404 - could be 403 - don't want people trying to find if certain events exist
                return
            }

            res.status(200).json(event)
        })
    })
})

router.post('/', (req, res, next) => {
    const parsedResult = postBodyToPOSTEventRequestDTO(req.body)
    if (parsedResult.status === ParsedStatus.FailedToParse) {
        res.status(422).send()
        return
    }
    const eventReq = parsedResult.parsed!!

    guardAuthenticated(req, res, async (uid) => {
        if (eventReq.firebaseOwnerId !== uid) {
            res.status(403).send()
            return
        }
        addEvent(eventReq).then(result => {
            switch (result.state) {
                case POSTEventRequestResultState.Conflict:
                    res.status(409).send()
                case POSTEventRequestResultState.Created:
                    res.status(200).json(result.dbEvent!!)
                case POSTEventRequestResultState.GenericError:
                    res.status(500).send()
            }
        })
    })
})

router.delete('/:eventId', (req, res, next) => {
    guardAuthenticated(req, res, (uid) => {
        const eventId = Number(req.params.eventId)

        // TODO - delete event by owner and event id in psql rather than 2 queries
        getEventById(eventId).then(eventResult => {
            if (eventResult.state === EventState.DoesntExist) {
                res.status(404).send()
                return
            }

            const event = eventResult.event!!
            if (event.organizer.firebaseOwnerId !== uid) {
                res.status(404).send() // Err on 404 - could be 403 - don't want people trying to find if certain events exist
                return
            }

            deleteEvent(event.id).then(() => {
                res.status(200).json(event)
            })
        })
    })
})

export default router