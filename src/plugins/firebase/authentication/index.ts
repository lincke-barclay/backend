import { FirebaseApp } from "firebase/app"
import { getAuth } from "firebase/auth"

export function installAuth(app: FirebaseApp) {
    return getAuth(app)
}
