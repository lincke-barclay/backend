import AppQuery from "../../../database/AppQuery"
import { DeleteSingleEventQuery, EventsQuery, InsertEventQuery, SingleEventQuery } from "../../models/EventQueries"
import DatabaseEvent from "../models/DatabaseEvent"
import { dbRowToDatabaseEvent } from "../transforms/EventTransforms"

export function constructEventsQuery(eventsQuery: EventsQuery): AppQuery<DatabaseEvent[]> {
    const q = "SELECT * FROM events"
    // TODO - make this smart :)
    return {
        query: {
            text: q,
        },
        onSuccess: (result) => result.rows.map(dbRowToDatabaseEvent)
    }
}

export function constructSingleEventQuery(singleEventQuery: SingleEventQuery): AppQuery<DatabaseEvent> {
    const q = "SELECT * FROM events WHERE id = $1"
    const values = [singleEventQuery.id!!]

    // TODO
    return {
        query: {
            text: q,
            values,
        },
        onSuccess: (result) => dbRowToDatabaseEvent(result.rows[0])
    }
}

export function constructInsertEventQuery(insertEventQuery: InsertEventQuery): AppQuery<DatabaseEvent> {
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
        query: {
            text: q,
            values,
        },
        onSuccess: (result) => dbRowToDatabaseEvent(result.rows[0])
    }
}

export function constructDeleteSingleEventQuery(deleteSingleEventQuery: DeleteSingleEventQuery): AppQuery<void> {
    const q = "DELETE FROM events WHERE id = $1"
    const values = [deleteSingleEventQuery.id]

    return {
        query: {
            text: q,
            values,
        },
        onSuccess: (result) => { return }
    }
}
