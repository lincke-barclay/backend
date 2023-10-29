import {getAuth} from "firebase-admin/auth";
import {FirebaseError} from "firebase/app";
import {AuthErrorCodes} from "firebase/auth";
import {AuthState} from "../models/Users";
import {GetTokenResult} from "./models/FirebaseUserModels";

const unauthorizedCodes = new Set<string>([
    AuthErrorCodes.INVALID_AUTH,
    AuthErrorCodes.TOKEN_EXPIRED,
    AuthErrorCodes.NULL_USER
])

export default class FirebaseTokenDataSource {
    async getDecodedToken(token: string): Promise<GetTokenResult> {
        try {
            const decodedToken = await getAuth().verifyIdToken(token)
            return { authState: AuthState.Authenticated, token: decodedToken }
        } catch (e) {
            if (e instanceof FirebaseError) {
                if (unauthorizedCodes.has(e.message)) {
                    return { authState: AuthState.Unauthenticated, token: undefined }
                }
            }
            throw e
        }
    }
}
