import { Pool, QueryResult } from "pg"
import { Unimplimented500Error } from "../errors/apiExposedErrors"
import AppQuery from "./AppQuery"

export function ensureExistsAndIsUnique(result: QueryResult<any>) {
    if (result.rows.length !== 1) {
        throw new Unimplimented500Error("Figure this out boss")
    }
    return result
}

export async function simpleExecute<T>(pool: Pool, appQuery: AppQuery<T>): Promise<T> {
    return await pool
        .query(appQuery.query)
        .then(appQuery.onSuccess)
}

export async function simpleExecuteEnsureExistsAndUnique<T>(pool: Pool, appQuery: AppQuery<T>): Promise<T> {
    return await pool
        .query(appQuery.query)
        .then(ensureExistsAndIsUnique)
        .then(appQuery.onSuccess)
}