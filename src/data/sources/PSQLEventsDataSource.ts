import { Pool } from "pg";
import DatabaseEvent from "./models/DatabaseEvent"
import { POSTEventRequestDTO } from "../../routes/models/Events";
import { EventsQuery, SingleEventQuery } from "../models/EventQueries";
import { constructDeleteSingleEventQuery, constructEventsQuery, constructInsertEventQuery, constructSingleEventQuery } from "./queries/EventQueries";
import { simpleExecute, simpleExecuteEnsureExistsAndUnique } from "../../database/ResultLambdas";

export default class PSQLEventsDataSource {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async getEvents(query: EventsQuery): Promise<DatabaseEvent[]> {
        return await simpleExecute(this.pool, constructEventsQuery(query))
    }

    async getEvent(query: SingleEventQuery): Promise<DatabaseEvent> {
        return await simpleExecuteEnsureExistsAndUnique(this.pool, constructSingleEventQuery(query))
    }

    async addEvent(event: POSTEventRequestDTO): Promise<DatabaseEvent> {
        return await simpleExecuteEnsureExistsAndUnique(this.pool, constructInsertEventQuery({ event }))
    }

    async deleteEvent(eventId: number): Promise<void> {
        return await simpleExecute(this.pool, constructDeleteSingleEventQuery({ id: eventId }))
    }
}
