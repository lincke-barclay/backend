/* tslint:disable:max-classes-per-file... */
export class APIExposedError extends Error {
    code: number
    jsonBody: any
    constructor(code: number, jsonBody: any, message?: string | undefined) {
        super(message)
        this.code = code
        this.jsonBody = jsonBody
    }
}

export class Unauthenticated401Error extends APIExposedError {
    constructor(message?: string | undefined) {
        super(401, "unauthenticated", message)
    }
}

export class Unimplimented500Error extends APIExposedError {
    constructor(message?: string | undefined) {
        super(500, "Unimplemented", message)
    }
}

export class NotFound404Error extends APIExposedError {
    apiExposedMessage?: string
    constructor(message?: string | undefined) {
        super(404, "not found", message)
    }
}