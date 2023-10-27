import { Pool } from "pg";
import { POSTEventRequestDTO } from "../../routes/models/Events";
import { EventsQuery, SingleEventQuery } from "../models/EventQueries";
import { constructDeleteSingleEventQuery, constructEventsQuery, constructInsertEventQuery, constructSingleEventQuery } from "./queries/EventQueries";
import DatabaseEvent, { GetDatabaseEventResult, POSTEventRequestResult } from "./models/DatabaseEventModels";
import { dbResultToGetDatabaseEventResult, dbResultToPOSTEventResult, dbRowToDatabaseEvent } from "./transforms/EventTransforms";

export default class PSQLEventsDataSource {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async getEvents(query: EventsQuery): Promise<DatabaseEvent[]> {
        return await this.pool
            .query(constructEventsQuery(query))
            .then(result => result.rows.map(dbRowToDatabaseEvent))
    }

    async getEvent(query: SingleEventQuery): Promise<GetDatabaseEventResult> {
        return await this.pool
            .query(constructSingleEventQuery(query))
            .then(dbResultToGetDatabaseEventResult)
    }

    async addEvent(event: POSTEventRequestDTO): Promise<POSTEventRequestResult> {
        return await this.pool
            .query(constructInsertEventQuery({ event }))
            .then(dbResultToPOSTEventResult)
    }

    async deleteEvent(eventId: number): Promise<void> {
        // TODO - error handle
        await this.pool.query(constructDeleteSingleEventQuery({ id: eventId }))
    }
}
