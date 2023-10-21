export default interface EventDTO {
    id: number,
    title: string,
    shortDescription: string,
    longDescription: string,
    firebaseOwnerId: string,
    createdDateTime: Date,
    startingDateTime: Date,
    endingDateTime: Date,
}