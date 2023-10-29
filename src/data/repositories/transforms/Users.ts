import {AuthState, GetUserIdFromTokenResult, GetUserResult, UserState} from "../../models/Users"
import {FirebaseUserState, GetFirebaseUserResult, GetTokenResult} from "../../sources/models/FirebaseUserModels"

export function transformToDomainUserResult(result: GetFirebaseUserResult) {
    if (result.state === FirebaseUserState.DoesntExist) {
        return { state: UserState.DoesntExist } as GetUserResult
    } else {
        if (result.record === undefined) {
            throw Error("Firebase user exists but user is undefined!")
        }
        if (result.record.displayName === undefined) {
            return { state: UserState.Uninitialized } as GetUserResult
        }
        if (!result.record.emailVerified) {
            return { state: UserState.EmailNotVerified } as GetUserResult
        }
        return {
            state: UserState.Active,
            user: {
                firebaseOwnerId: result.record.uid,
                photoUrl: result.record.photoURL,
                name: result.record.displayName!!,
            }
        }
    }
}

export function transformToDomainIDFromTokenResult(result: GetTokenResult): GetUserIdFromTokenResult {
    if (result.authState === AuthState.Unauthenticated) {
        return { authState: AuthState.Unauthenticated } as GetUserIdFromTokenResult
    }
    if (result.token === undefined) {
        throw Error("User token is null but result is authenticated")
    }
    return { authState: AuthState.Authenticated, uid: result.token.uid }
}