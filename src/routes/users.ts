import express from "express"
import {getSuggestedFriendsFor} from "../domain/friends"
import {guardAuthenticated} from "./util"

const router = express.Router()

router.get('/friends/suggested', (req, res) => {
    guardAuthenticated(req, res, (uid) => {
        getSuggestedFriendsFor(uid).then(users => {
            res.status(200).json(users)
        })
    })
})

export default router