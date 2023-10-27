import { Pool } from "pg"
import { PublicUserDTO } from "../models/Users"
import { constructMyFriendsQuery, insertFriendship, pendingFriendshipsISent, pendingFriendshipsSentToMe, transitionFriendship } from "./queries/FriendshipQueries"
import { simpleExecute } from "../../database/ResultLambdas"

export default class PSQLFriendshipDataSource {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async getConfirmedFriendshipsForUser(id: string): Promise<string[]> {
        return await simpleExecute(this.pool, constructMyFriendsQuery(id))
    }

    async getPendingFriendshipsThatUserSent(id: string): Promise<string[]> {
        return await simpleExecute(this.pool, pendingFriendshipsISent(id))
    }

    async getPendingFriendshipsSentToUser(id: string): Promise<string[]> {
        return await simpleExecute(this.pool, pendingFriendshipsSentToMe(id))
    }

    async requestFriendship(requesterId: string, recipientId: string): Promise<void> {
        return await simpleExecute(this.pool, insertFriendship(requesterId, recipientId))
    }

    async acceptFriendship(requesterId: string, recipientId: string): Promise<void> {
        return await simpleExecute(this.pool, transitionFriendship(requesterId, recipientId))
    }
}