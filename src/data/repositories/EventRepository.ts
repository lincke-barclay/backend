import PSQLEventsDataSource from "../sources/PSQLEventsDataSource"
import UserRepository from "./UserRepository"
import { EventWithPublicUser } from "../models/Events"
import { PublicUserDTO } from "../models/Users"
import { POSTEventRequestDTO } from "../../routes/models/Events"
import { EventsQuery, SingleEventQuery } from "../models/EventQueries"
import DatabaseEvent from "../sources/models/DatabaseEvent"

export default class EventRepository {
    userRepository: UserRepository
    psqlEventDataSource: PSQLEventsDataSource

    constructor(userRepository: UserRepository, psqlEventDataSource: PSQLEventsDataSource) {
        this.userRepository = userRepository
        this.psqlEventDataSource = psqlEventDataSource
    }

    async getEventsCombinedWithUsers(query: EventsQuery): Promise<EventWithPublicUser[]> {
        const events = await this.psqlEventDataSource.getEvents(query)
        const userIds = events.map(it => it.firebaseOwnerId)
        const users = await this.userRepository.getUsers(userIds)
        return joinUsersWithEvents(users, events)
    }

    async getEventCombinedWithUser(query: SingleEventQuery): Promise<EventWithPublicUser | undefined> {
        const event = await this.psqlEventDataSource.getEvent(query)
        const user = await this.userRepository.getUser(event.firebaseOwnerId)
        if (user !== undefined) {
            return joinEventWithUser(user, event)
        } else {
            return undefined
        }
    }

    async addEvent(event: POSTEventRequestDTO): Promise<DatabaseEvent> {
        const result = await this.psqlEventDataSource.addEvent(event)
        return result
    }

    async deleteEvent(eventId: number): Promise<void> {
        await this.psqlEventDataSource.deleteEvent(eventId)
    }
}

function joinUsersWithEvents(
    users: PublicUserDTO[],
    events: DatabaseEvent[]
): EventWithPublicUser[] {
    const uidToUser = Object.fromEntries(users.map(user => {
        return [user.firebaseOwnerId, user]
    }))
    return events.map(event => {
        const user = uidToUser[event.firebaseOwnerId]
        if (user === undefined) {
            return null
        }
        return joinEventWithUser(user, event)
    }).filter((it): it is EventWithPublicUser => { return it != null })
}

function joinEventWithUser(user: PublicUserDTO, event: DatabaseEvent): EventWithPublicUser {
    console.assert(user.firebaseOwnerId === event.firebaseOwnerId)
    return {
        id: event.id,
        title: event.title,
        shortDescription: event.shortDescription,
        longDescription: event.longDescription,
        organizer: user,
        createdDateTime: event.createdDateTime,
        startingDateTime: event.startingDateTime,
        endingDateTime: event.endingDateTime,
    }
}
