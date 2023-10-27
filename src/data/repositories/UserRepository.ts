import FirebaseUserDataSource from "../sources/FirebaseUserDataSource";
import { PublicUserDTO } from "../models/Users";
import { UserRecord } from "firebase-admin/auth";
import { Unimplimented500Error } from "../../errors/apiExposedErrors";

export default class {
    firebaseUserDataSource: FirebaseUserDataSource

    constructor(firebaseUserDataSource: FirebaseUserDataSource) {
        this.firebaseUserDataSource = firebaseUserDataSource
    }

    async getUser(id: string): Promise<PublicUserDTO | undefined> {
        try {
            const user = await this.firebaseUserDataSource.getFirebaseUserById(id)
            return transformFirebaseUserToDomainPublicUserDTO(user)
        } catch (e: any) {
            console.error(e.code)
            return undefined
        }
    }

    async getUsers(ids: string[]): Promise<PublicUserDTO[]> {
        const users = await this.firebaseUserDataSource.getFirebaseUsersById(ids)
        return users.map(transformFirebaseUserToDomainPublicUserDTO)
    }

    // TODO: DELETE - make smarter user query
    async getBatchOfUsers(): Promise<PublicUserDTO[]> {
        const users = await this.firebaseUserDataSource.getBatchOfUsers()
        return users.filter(it => it.displayName !== undefined).map(transformFirebaseUserToDomainPublicUserDTO)
    }
}

function transformFirebaseUserToDomainPublicUserDTO(user: UserRecord): PublicUserDTO {
    if (user.displayName == null) {
        throw new Unimplimented500Error("Who knows")
    } else {
        return {
            name: user.displayName,
            photoUrl: user.photoURL,
            firebaseOwnerId: user.uid
        }
    }
}
