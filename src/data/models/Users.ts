export enum AuthState {
    Authenticated,
    Unauthenticated
}

export interface PublicUserDTO {
    firebaseOwnerId: string,
    photoUrl: string | undefined,
    name: string,
}

export enum UserState {
    DoesntExist,
    Active,
    EmailNotVerified,
    Uninitialized
}

export interface GetUserIdFromTokenResult {
    authState: AuthState,
    uid: string | undefined,
}

export interface GetUserResult {
    state: UserState,
    user: PublicUserDTO | undefined
}

