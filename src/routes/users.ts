import express from "express"
import { getSuggestedFriendsFor } from "../domain/friends"

const router = express.Router()

router.get('/friends/suggested', (req, res) => {
    getSuggestedFriendsFor("foo").then(users => {
        res.status(200).json(users)
    })
})

export default router