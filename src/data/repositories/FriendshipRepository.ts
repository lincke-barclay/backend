import { PublicUserDTO } from "../models/Users";
import PSQLFriendshipDataSource from "../sources/PSQLFriendshipDataSource";
import UserRepository from "./UserRepository";

export default class FriendshipRepository {
    psqlFriendshipDataSource: PSQLFriendshipDataSource
    userRepository: UserRepository

    constructor(psqlFriendshipDataSource: PSQLFriendshipDataSource, userRepository: UserRepository) {
        this.psqlFriendshipDataSource = psqlFriendshipDataSource
        this.userRepository = userRepository
    }

    async getConfirmedFriendshipsForUser(id: string): Promise<PublicUserDTO[]> {
        return this.mergeIds(await this.psqlFriendshipDataSource.getConfirmedFriendshipsForUser(id))
    }

    async getPendingFriendshipsThatUserSent(id: string): Promise<PublicUserDTO[]> {
        return this.mergeIds(await this.psqlFriendshipDataSource.getPendingFriendshipsThatUserSent(id))
    }

    async getPendingFriendshipsSentToUser(id: string): Promise<PublicUserDTO[]> {
        return this.mergeIds(await this.psqlFriendshipDataSource.getPendingFriendshipsSentToUser(id))
    }

    async requestFriendship(requesterId: string, recipientId: string): Promise<void> {
        return await this.psqlFriendshipDataSource.requestFriendship(requesterId, recipientId)
    }

    async acceptFriendship(requesterId: string, recipientId: string): Promise<void> {
        return await this.psqlFriendshipDataSource.acceptFriendship(requesterId, recipientId)
    }

    async mergeIds(ids: string[]): Promise<PublicUserDTO[]> {
        return await this.userRepository.getUsers(ids)
    }
}