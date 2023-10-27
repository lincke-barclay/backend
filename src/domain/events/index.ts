import { provideEventRepository } from "../../data/events";
import { EventsQuery, SingleEventQuery } from "../../data/models/EventQueries";
import { NotFound404Error } from "../../errors/apiExposedErrors";
import { POSTEventRequestDTO } from "../../routes/models/Events";

const eventRepository = provideEventRepository()

export async function getEventById(id: number) {
    const query: SingleEventQuery = {
        id
    }
    const event = await eventRepository.getEventCombinedWithUser(query)
    if (event === undefined) {
        throw new NotFound404Error("Couldn't find event")
    } else {
        return event
    }
}

export async function getFeed(userId: number, page: number, pageSize: number, offset: number) {
    const query: EventsQuery = {
        page,
        pageSize,
        offset,
    }
    return await eventRepository.getEventsCombinedWithUsers(query)
}

export async function addEvent(event: POSTEventRequestDTO) {
    return await eventRepository.addEvent(event)
}

export async function deleteEvent(id: number) {
    return await eventRepository.deleteEvent(id)
}