import FirebaseUserDataSource from "../sources/FirebaseUserDataSource";
import { GetUserIdFromTokenResult, GetUserResult, PublicUserDTO } from "../models/Users";
import { transformToDomainIDFromTokenResult, transformToDomainUserResult } from "./transforms/Users";
import FirebaseTokenDataSource from "../sources/FirebaseTokenDataSource";

export default class {
    firebaseUserDataSource: FirebaseUserDataSource
    firebaseAuthenticationDS: FirebaseTokenDataSource

    constructor(firebaseUserDataSource: FirebaseUserDataSource, firebaseAuthenticationDS: FirebaseTokenDataSource) {
        this.firebaseUserDataSource = firebaseUserDataSource
        this.firebaseAuthenticationDS = firebaseAuthenticationDS
    }

    async getUser(id: string): Promise<GetUserResult> {
        const result = await this.firebaseUserDataSource.getFirebaseUserById(id)
        return transformToDomainUserResult(result)
    }

    async getUserIdFromToken(token: string): Promise<GetUserIdFromTokenResult> {
        const result = await this.firebaseAuthenticationDS.getDecodedToken(token)
        return transformToDomainIDFromTokenResult(result)
    }

    async getUsers(ids: string[]): Promise<PublicUserDTO[]> {
        const users = await this.firebaseUserDataSource.getFirebaseUsersById(ids)
        return users.map(transformToDomainUserResult)
            .map(it => it.user)
            .filter((it): it is PublicUserDTO => { return it !== undefined })
    }

    // TODO: DELETE - make smarter user query
    async getBatchOfUsers(): Promise<PublicUserDTO[]> {
        const users = await this.firebaseUserDataSource.getBatchOfUsers()
        return users.map(transformToDomainUserResult)
            .map(it => it.user)
            .filter((it): it is PublicUserDTO => { return it !== undefined })
    }
}
