import {POSTEventRequestDTO} from "../../routes/models/Events"
import {PageableQuery} from "./Queries"

export interface EventsQuery extends PageableQuery {
    order?: EventOrderType,
    searchString?: string,
    filter?: EventFilter,
}

export enum EventOrderType {
    DateStartingAscending,
    DateStartingDescending,
}

export interface EventFilter {
    organizerIds: Set<string>,
    datesStarting: Set<Date>,
    datesEnding: Set<Date>,
}

export interface SingleEventQuery {
    title?: string,
    id?: number
}

export interface InsertEventQuery {
    event: POSTEventRequestDTO, // TODO
}

export interface DeleteSingleEventQuery {
    id: number,
}