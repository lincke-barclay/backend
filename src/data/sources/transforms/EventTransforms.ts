import DatabaseEvent from "../models/DatabaseEvent";

export function dbRowToDatabaseEvent(
    row: any,
): DatabaseEvent {
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