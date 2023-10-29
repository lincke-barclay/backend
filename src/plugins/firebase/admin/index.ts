import admin from "firebase-admin";
import {applicationDefault} from "firebase-admin/app";

export function installAdmin() {
    admin.initializeApp({
        credential: applicationDefault()
    })
}
