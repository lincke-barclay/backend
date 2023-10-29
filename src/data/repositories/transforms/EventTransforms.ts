import {EventState, EventWithPublicUser, GetEventResult} from "../../models/Events";
import {GetUserResult, PublicUserDTO, UserState} from "../../models/Users";
import DatabaseEvent, {DatabaseEventState, GetDatabaseEventResult} from "../../sources/models/DatabaseEventModels";

export async function combineUserResultWithEventResult(
    eventResult: GetDatabaseEventResult,
    getUserResultForEventId: (userId: string) => Promise<GetUserResult>
): Promise<GetEventResult> {
    if (eventResult.state === DatabaseEventState.DoesntExist) {
        return { state: EventState.DoesntExist } as GetEventResult
    } else {
        if (eventResult.event === undefined) {
            throw new Error("Event exists but event is undefined")
        }
        const ownerId = eventResult.event.firebaseOwnerId
        const userResult = await getUserResultForEventId(ownerId)

        if (userResult.state !== UserState.Active) {
            // TODO - This means deleted users should not have any events associated with them
            throw Error(`There are events in the database associated with an unactive user: ${ownerId}`)
        }
        if (userResult.user === undefined) {
            throw Error(`Owner of event ${ownerId} came up in an undefined user!`)
        }
        const event = joinEventWithUser(userResult.user, eventResult.event)
        return { state: EventState.Exists, event }
    }
}

export function joinUsersWithEvents(
    users: PublicUserDTO[],
    events: DatabaseEvent[]
): EventWithPublicUser[] {
    const uidToUser = Object.fromEntries(users.map(user => {
        return [user.firebaseOwnerId, user]
    }))
    return events.map(event => {
        const user = uidToUser[event.firebaseOwnerId]
        if (user === undefined) {
            return null
        }
        return joinEventWithUser(user, event)
    }).filter((it): it is EventWithPublicUser => { return it != null })
}

export function joinEventWithUser(user: PublicUserDTO, event: DatabaseEvent): EventWithPublicUser {
    console.assert(user.firebaseOwnerId === event.firebaseOwnerId)
    return {
        id: event.id,
        title: event.title,
        shortDescription: event.shortDescription,
        longDescription: event.longDescription,
        organizer: user,
        createdDateTime: event.createdDateTime,
        startingDateTime: event.startingDateTime,
        endingDateTime: event.endingDateTime,
    }
}
