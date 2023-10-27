import { PublicUserDTO } from "./Users";

export interface EventWithPublicUser {
    id: number,
    title: string,
    shortDescription: string,
    longDescription: string,
    organizer: PublicUserDTO,
    createdDateTime: Date,
    startingDateTime: Date,
    endingDateTime: Date,
}

export enum EventState {
    Exists,
    DoesntExist,
}

export interface GetEventResult {
    state: EventState,
    event: EventWithPublicUser | undefined,
}