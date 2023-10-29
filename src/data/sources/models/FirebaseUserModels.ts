import {DecodedIdToken, UserRecord} from "firebase-admin/auth";
import {AuthState} from "../../models/Users";

export enum FirebaseUserState {
    Exists,
    DoesntExist,
}

export interface GetTokenResult {
    authState: AuthState,
    token: DecodedIdToken | undefined,
}

export interface GetFirebaseUserResult {
    state: FirebaseUserState,
    record: UserRecord | undefined
}