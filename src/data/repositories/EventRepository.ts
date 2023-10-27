import PSQLEventsDataSource from "../sources/PSQLEventsDataSource"
import UserRepository from "./UserRepository"
import { EventWithPublicUser, GetEventResult } from "../models/Events"
import { POSTEventRequestDTO } from "../../routes/models/Events"
import { EventsQuery, SingleEventQuery } from "../models/EventQueries"
import { POSTEventRequestResult } from "../sources/models/DatabaseEventModels"
import { combineUserResultWithEventResult, joinUsersWithEvents } from "./transforms/EventTransforms"

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

    async getEventCombinedWithUser(query: SingleEventQuery): Promise<GetEventResult> {
        const eventResult = await this.psqlEventDataSource.getEvent(query)
        return combineUserResultWithEventResult(
            eventResult,
            async (ownerId) => await this.userRepository.getUser(ownerId)
        )
    }

    async addEvent(event: POSTEventRequestDTO): Promise<POSTEventRequestResult> {
        const result = await this.psqlEventDataSource.addEvent(event)
        return result
    }

    async deleteEvent(eventId: number): Promise<void> {
        await this.psqlEventDataSource.deleteEvent(eventId)
    }
}

