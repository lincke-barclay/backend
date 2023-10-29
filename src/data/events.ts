import providePool from "../database";
import {provideUserRepository} from "./users";
import EventRepository from "./repositories/EventRepository";
import PSQLEventsDataSource from "./sources/PSQLEventsDataSource";

export function provideEventRepository() {
    return new EventRepository(provideUserRepository(), new PSQLEventsDataSource(providePool()))
}