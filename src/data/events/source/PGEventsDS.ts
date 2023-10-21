import { Pool } from "pg";
import { UnimplimentedError } from "../../../errors/errors";
import EventDTO from "./models/network/EventDTO"
import POSTEventRequestDTO from "./models/network/POSTEventRequestDTO";

export default class PGEventsDS {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async getAllEvents(): Promise<Array<EventDTO>> {
        const events = await this.pool.query("SELECT * FROM events")
        const mappedEvents: Array<EventDTO> = events.rows.map(dbRowToEventDTO)
        return mappedEvents
    }

    async addEvent(event: POSTEventRequestDTO): Promise<EventDTO> {
        const createdDateTime = new Date()

        const query = "INSERT INTO events " +
            "(title, short_description, long_description, firebase_owner_id, created_datetime_utc, starting_datetime_utc, ending_datetime_utc)" +
            "VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id"
        const queryVals = POSTEventRequestDTOToDbArray(event, createdDateTime)

        const result = await this.pool.query(query, queryVals)

        if (result.rowCount == 1) {
            return POSTEventRequestDTOToEventDTO(
                event,
                result.rows[0].id,
                createdDateTime,
            )
        } else {
            throw new UnimplimentedError("Rows not equal 1 POST")
        }
    }

    async deleteEvent(eventId: number): Promise<void> {
        const result = await this.pool.query(
            "DELETE FROM events WHERE id = $1 RETURNING id",
            [String(eventId)],
        )
        if (result.rowCount == 1) {
            console.log("Deleted: ", result.rows[0].id)
        } else {
            throw new UnimplimentedError("DELETE not successful")
        }
    }

    async getSingleEvent(id: number): Promise<EventDTO> {
        const query = "SELECT * FROM events WHERE id = $1"
        const results = await this.pool.query(query, [id])

        if (results.rowCount == 1) {
            return dbRowToEventDTO(results.rows[0])
        } else {
            throw new UnimplimentedError("No events exist with id")
        }
    }
}

function dbRowToEventDTO(row: any): EventDTO {
    return {
        id: row.id,
        title: row.title,
        shortDescription: row.short_description,
        longDescription: row.long_description,
        firebaseOwnerId: row.firebase_owner_id,
        createdDateTime: new Date(row.created_datetime_utc),
        startingDateTime: new Date(row.starting_datetime_utc),
        endingDateTime: new Date(row.ending_datetime_utc),
    }
}

function POSTEventRequestDTOToDbArray(
    eventDto: POSTEventRequestDTO,
    createdDateTime: Date,
): Array<any> {
    return [
        eventDto.title,
        eventDto.shortDescription,
        eventDto.longDescription,
        eventDto.firebaseOwnerId,
        createdDateTime.toUTCString(),
        eventDto.startingDateTime.toUTCString(),
        eventDto.endingDateTime.toUTCString(),
    ]
}

function POSTEventRequestDTOToEventDTO(
    event: POSTEventRequestDTO,
    id: number,
    createdDateTime: Date,
): EventDTO {
    return {
        id: id,
        title: event.title,
        shortDescription: event.shortDescription,
        longDescription: event.longDescription,
        firebaseOwnerId: event.firebaseOwnerId,
        createdDateTime: createdDateTime,
        startingDateTime: event.startingDateTime,
        endingDateTime: event.endingDateTime,
    }
}