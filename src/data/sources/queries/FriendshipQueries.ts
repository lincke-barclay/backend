import AppQuery from "../../../database/AppQuery";

export function constructMyFriendsQuery(myId: string): AppQuery<string[]> {
    const q = "SELECT * FROM friendships WHERE (requester = $1 OR recipient = $1) AND status = 'accepted'"
    const values = [myId]

    return {
        query: {
            text: q,
            values,
        },
        onSuccess: (result) => result.rows.map(row => {
            return row.requester === myId ? row.recipient : row.requester
        })
    }
}

export function pendingFriendshipsISent(myId: string): AppQuery<string[]> {
    const q = "SELECT * FROM friendships WHERE requester = $1 AND status = 'pending'"
    const values = [myId]

    return {
        query: {
            text: q,
            values,
        },
        onSuccess: (result) => result.rows.map(row => row.recipient)
    }
}

export function pendingFriendshipsSentToMe(myId: string): AppQuery<string[]> {
    const q = "SELECT * FROM friendships WHERE recipient = $1 AND status = 'pending'"
    const values = [myId]

    return {
        query: {
            text: q,
            values,
        },
        onSuccess: (result) => result.rows.map(row => row.requester)
    }
}

export function insertFriendship(requester: string, recipient: string): AppQuery<void> {
    const q = "INSERT INTO friendships (requester, recipient, friend_status) VALUES ($1, $2, 'pending')"
    const values = [requester, recipient]

    return {
        query: {
            text: q,
            values,
        },
        onSuccess: () => { return }
    }
}

export function transitionFriendship(requester: string, recipient: string): AppQuery<void> {
    const q = "UPDATE friendships SET friend_status = 'accepted' WHERE requester = $1 AND recipient = $2"
    const values = [requester, recipient]

    return {
        query: {
            text: q,
            values,
        },
        onSuccess: () => { return }
    }
}
