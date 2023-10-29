import {Pool} from "pg"
import {
    constructMyFriendsQuery,
    insertFriendship,
    pendingFriendshipsISent,
    pendingFriendshipsSentToMe,
    transitionFriendship
} from "./queries/FriendshipQueries"

export default class PSQLFriendshipDataSource {
    pool: Pool

    constructor(pool: Pool) {
        this.pool = pool
    }

    async getConfirmedFriendshipsForUser(id: string): Promise<string[]> {
        return await this.pool
            .query(constructMyFriendsQuery(id))
            .then(result => result.rows.map(row => row.requester === id ? row.recipient : row.requester))
    }

    async getPendingFriendshipsThatUserSent(id: string): Promise<string[]> {
        return await this.pool
            .query(pendingFriendshipsISent(id))
            .then(result => result.rows.map(row => row.recipient))
    }

    async getPendingFriendshipsSentToUser(id: string): Promise<string[]> {
        return await this.pool
            .query(pendingFriendshipsSentToMe(id))
            .then(result => result.rows.map(row => row.requester))
    }

    async requestFriendship(requesterId: string, recipientId: string): Promise<void> {
        // TODO - Handle errors
        await this.pool.query(insertFriendship(requesterId, recipientId))
    }

    async acceptFriendship(requesterId: string, recipientId: string): Promise<void> {
        // TODO - Handle errors
        await this.pool.query(transitionFriendship(requesterId, recipientId))
    }
}