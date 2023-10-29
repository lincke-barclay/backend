import {Request, Response} from "express";
import {AuthState} from "../data/models/Users";
import {provideUserRepository} from "../data/users";

const userRepository = provideUserRepository()

export function guardAuthenticated(
    req: Request,
    res: Response,
    thenWhat: (uid: string) => void,
) {
    let token = req.headers.authorization
    if (token === undefined) {
        res.status(401).send()
        return
    }
    token = token.split(" ")[1]

    userRepository.getUserIdFromToken(token).then(tokenResult => {
        if (tokenResult.authState === AuthState.Unauthenticated) {
            res.status(401).send()
            return
        }
        thenWhat(tokenResult.uid!!)
    })
}