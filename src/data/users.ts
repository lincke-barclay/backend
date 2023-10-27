import providePool from "../database";
import UserRepository from "./repositories/UserRepository";
import FirebaseTokenDataSource from "./sources/FirebaseTokenDataSource";
import FirebaseUserDataSource from "./sources/FirebaseUserDataSource";

export function provideUserRepository() {
    return new UserRepository(new FirebaseUserDataSource(providePool()), new FirebaseTokenDataSource())
}