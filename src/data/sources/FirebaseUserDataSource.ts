import { Pool } from "pg";
import { UidIdentifier, UserRecord, getAuth } from "firebase-admin/auth";

export default class {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async getFirebaseUserById(id: string): Promise<UserRecord> {
        return await getAuth().getUser(id)
    }

    async getFirebaseUsersById(ids: string[]): Promise<UserRecord[]> {
        const fbUsersQuery = Array.from(ids).map(it => { return { uid: it } as UidIdentifier })
        return (await getAuth().getUsers(fbUsersQuery)).users
    }

    // TODO - DELTE ME
    async getBatchOfUsers(): Promise<UserRecord[]> {
        return (await getAuth().listUsers(100)).users
    }
}
