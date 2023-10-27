import { Request, Response } from "express";
import { AuthState } from "../data/models/Users";
import { GetTokenResult } from "../data/sources/models/FirebaseUserModels";
import { provideUserRepository } from "../data/users";

const userRepository = provideUserRepository()

export async function guardAuthenticated(
    req: Request,
    res: Response,
    thenWhat: (uid: string) => void,
) {
    const token = req.headers.authorization
    if (token === undefined) {
        res.status(401).send()
        return
    }

    const tokenResult = await userRepository.getUserIdFromToken(token)
    if (tokenResult.authState === AuthState.Unauthenticated) {
        res.status(401).send()
        return
    }
    thenWhat(tokenResult.uid!!)
}