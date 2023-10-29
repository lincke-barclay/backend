import express from "express"
import {getFeed} from "../domain/events"
import {guardAuthenticated} from "./util"

const router = express.Router()

router.get('/', (req, res, next) => {
    guardAuthenticated(req, res, () => {
        console.log("here")
        getFeed(-1, 0, 10, 100).then(events => {
            events.forEach(it => console.log(it))
            res.status(200).json(events)
        })
    })
})

export default router