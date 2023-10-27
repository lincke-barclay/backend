import { QueryResult } from "pg";
import DatabaseEvent, { DatabaseEventState, GetDatabaseEventResult, POSTEventRequestResult, POSTEventRequestResultState } from "../models/DatabaseEventModels";

export function dbRowToDatabaseEvent(
    row: any,
): DatabaseEvent {
    try {
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
    } catch (e) {
        const err = new Error("Error converting a database row into a database event")
        if (e instanceof Error) {
            err.stack += "\nCaused by:" + e.stack
        }
        throw err
    }
}

export function dbResultToGetDatabaseEventResult(result: QueryResult<any>): GetDatabaseEventResult {
    if (result.rowCount === 0) {
        return { state: DatabaseEventState.DoesntExist } as GetDatabaseEventResult
    } else if (result.rowCount === 1) {
        return { state: DatabaseEventState.Exists, event: dbRowToDatabaseEvent(result.rows[0]) } as GetDatabaseEventResult
    } else {
        throw new Error(`The result of a database query for a single event came up with more than one events: ${result.rows}`)
    }
}

export function dbResultToPOSTEventResult(result: QueryResult<any>): POSTEventRequestResult {
    if (result.rowCount === 0 || result.rowCount > 1) {
        throw new Error(`Unexpected response from INSERT ing an event: ${result.rows}`)
    }
    return { state: POSTEventRequestResultState.Created, dbEvent: dbRowToDatabaseEvent(result.rows[0]) }
}
