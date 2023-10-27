import { QueryConfig } from "pg";

export function constructMyFriendsQuery(myId: string): QueryConfig {
    const q = "SELECT * FROM friendships WHERE (requester = $1 OR recipient = $1) AND status = 'accepted'"
    const values = [myId]

    return {
        text: q,
        values,
    }
}

export function pendingFriendshipsISent(myId: string): QueryConfig {
    const q = "SELECT * FROM friendships WHERE requester = $1 AND status = 'pending'"
    const values = [myId]

    return {
        text: q,
        values,
    }
}

export function pendingFriendshipsSentToMe(myId: string): QueryConfig {
    const q = "SELECT * FROM friendships WHERE recipient = $1 AND status = 'pending'"
    const values = [myId]

    return {
        text: q,
        values,
    }
}

export function insertFriendship(requester: string, recipient: string): QueryConfig {
    const q = "INSERT INTO friendships (requester, recipient, friend_status) VALUES ($1, $2, 'pending')"
    const values = [requester, recipient]

    return {
        text: q,
        values,
    }
}

export function transitionFriendship(requester: string, recipient: string): QueryConfig {
    const q = "UPDATE friendships SET friend_status = 'accepted' WHERE requester = $1 AND recipient = $2"
    const values = [requester, recipient]

    return {
        text: q,
        values,
    }
}
