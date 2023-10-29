import providePool from "../database";
import FriendshipRepository from "./repositories/FriendshipRepository";
import PSQLFriendshipDataSource from "./sources/PSQLFriendshipDataSource";
import {provideUserRepository} from "./users";

export function provideFriendshipRepository(): FriendshipRepository {
    return new FriendshipRepository(
        new PSQLFriendshipDataSource(providePool()),
        provideUserRepository(),
    )
}
