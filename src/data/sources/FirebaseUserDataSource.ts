import { Pool } from "pg";
import { UidIdentifier, UserRecord, getAuth } from "firebase-admin/auth";
import { FirebaseError } from "firebase/app";
import { AuthErrorCodes } from "firebase/auth";
import { FirebaseUserState, GetFirebaseUserResult } from "./models/FirebaseUserModels";


export default class {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async getFirebaseUserById(id: string): Promise<GetFirebaseUserResult> {
        try {
            const user = await getAuth().getUser(id)
            return { state: FirebaseUserState.Exists, record: user }
        } catch (e) {
            if (e instanceof FirebaseError) {
                if (e.message === AuthErrorCodes.USER_DELETED) {
                    return { state: FirebaseUserState.DoesntExist } as GetFirebaseUserResult
                }
            }
            throw e
        }
    }

    async getFirebaseUsersById(ids: string[]): Promise<GetFirebaseUserResult[]> {
        const fbUsersQuery = Array.from(ids).map(it => { return { uid: it } as UidIdentifier })
        return (await getAuth().getUsers(fbUsersQuery)).users.map(user => { return { state: FirebaseUserState.Exists, record: user } })
    }

    // TODO - DELTE ME
    async getBatchOfUsers(): Promise<GetFirebaseUserResult[]> {
        return (await getAuth().listUsers(100)).users.map(user => { return { state: FirebaseUserState.Exists, record: user } })
    }
}
