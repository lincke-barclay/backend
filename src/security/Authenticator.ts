import { DecodedIdToken, getAuth } from "firebase-admin/auth";
import { FirebaseError } from "firebase/app";
import { Unauthenticated401Error } from "../errors/apiExposedErrors";

export default class Authenticator {
    async executeWithAuthenticationOrThrow<T>(authHeader: string | undefined, body: (userId: DecodedIdToken) => T): Promise<T> {
        if (authHeader === undefined) {
            throw new Unauthenticated401Error("Token is required")
        }
        try {
            const token = authHeader.split(" ")[1]
            const decodedToken = await getAuth().verifyIdToken(token)
            return body(decodedToken)
        } catch (e) {
            if (e instanceof FirebaseError) {
                console.error("Firebase Error: ", e.message)
            }
            throw e
        }
    }
}