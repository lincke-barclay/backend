import { POSTEventRequestDTO } from "../models/Events";

export enum ParsedStatus {
    Parsed,
    FailedToParse
}

interface NetworkParseResult<T> {
    status: ParsedStatus,
    parsed: T | undefined
}

export function postBodyToPOSTEventRequestDTO(body: any): NetworkParseResult<POSTEventRequestDTO> {
    try {
        return {
            status: ParsedStatus.Parsed,
            parsed: {
                title: body.title,
                shortDescription: body.shortDescription,
                longDescription: body.longDescription,
                firebaseOwnerId: body.firebaseOwnerId,
                startingDateTime: new Date(Date.parse(body.startingDateTime)),
                endingDateTime: new Date(Date.parse(body.endingDateTime))
            }
        }
    } catch (e) {
        return { status: ParsedStatus.FailedToParse } as NetworkParseResult<POSTEventRequestDTO>
    }
}
