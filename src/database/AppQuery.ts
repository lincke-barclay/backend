import { QueryConfig, QueryResult } from "pg";

export default interface AppQuery<T> {
    query: QueryConfig,
    onSuccess: (result: QueryResult<any>) => T
}