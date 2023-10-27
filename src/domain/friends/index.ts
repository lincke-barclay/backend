import { provideFriendshipRepository } from "../../data/friends";
import { provideUserRepository } from "../../data/users";

const friendshipRepository = provideFriendshipRepository()
const userRepository = provideUserRepository()

export function getSuggestedFriendsFor(id: string) {
    return userRepository.getBatchOfUsers()
}
