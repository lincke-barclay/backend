import { QueryConfig } from "pg"
import { DeleteSingleEventQuery, EventsQuery, InsertEventQuery, SingleEventQuery } from "../../models/EventQueries"

export function constructEventsQuery(eventsQuery: EventsQuery): QueryConfig {
    const q = "SELECT * FROM events"
    // TODO - make this smart :)
    return {
        text: q,
    }
}

export function constructSingleEventQuery(singleEventQuery: SingleEventQuery): QueryConfig {
    const q = "SELECT * FROM events WHERE id = $1"
    const values = [singleEventQuery.id!!]

    // TODO
    return {
        text: q,
        values,
    }
}

export function constructInsertEventQuery(insertEventQuery: InsertEventQuery): QueryConfig {
    const q = "INSERT INTO events " +
        "(title, short_description, long_description, firebase_owner_id, created_datetime_utc, starting_datetime_utc, ending_datetime_utc)" +
        "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *"

    const dateTimeOfInsertion = new Date()

    const values = [
        insertEventQuery.event.title,
        insertEventQuery.event.shortDescription,
        insertEventQuery.event.longDescription,
        insertEventQuery.event.firebaseOwnerId,
        dateTimeOfInsertion.toUTCString(),
        insertEventQuery.event.startingDateTime.toUTCString(),
        insertEventQuery.event.endingDateTime.toUTCString(),
    ]

    return {
        text: q,
        values,
    }
}

export function constructDeleteSingleEventQuery(deleteSingleEventQuery: DeleteSingleEventQuery): QueryConfig {
    const q = "DELETE FROM events WHERE id = $1"
    const values = [deleteSingleEventQuery.id]

    return {
        text: q,
        values,
    }
}
