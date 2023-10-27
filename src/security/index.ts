import Authenticator from "./Authenticator";

export function provideAuthenticator() {
    return new Authenticator()
}