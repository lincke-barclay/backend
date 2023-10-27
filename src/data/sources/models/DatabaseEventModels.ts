export default interface DatabaseEvent {
    id: number,
    title: string,
    shortDescription: string,
    longDescription: string,
    firebaseOwnerId: string,
    createdDateTime: Date,
    startingDateTime: Date,
    endingDateTime: Date,
}

export enum DatabaseEventState {
    Exists,
    DoesntExist,
}

export interface GetDatabaseEventResult {
    state: DatabaseEventState,
    event: DatabaseEvent | undefined,
}

export enum POSTEventRequestResultState {
    Created,
    Conflict,
    GenericError,
}

export interface POSTEventRequestResult {
    state: POSTEventRequestResultState,
    dbEvent: DatabaseEvent | undefined
}