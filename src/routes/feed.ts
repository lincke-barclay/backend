import express from "express"
import { getFeed } from "../domain/events"
import { provideAuthenticator } from "../security"

const router = express.Router()
const authenticator = provideAuthenticator()

router.get('/', (req, res, next) => {
    authenticator.executeWithAuthenticationOrThrow(req.headers.authorization, () => {
        getFeed(-1, 0, 10, 100).then(events => {
            res.status(200).json(events)
        })
    }).catch(next)
})

export default router