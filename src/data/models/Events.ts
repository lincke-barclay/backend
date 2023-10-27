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
