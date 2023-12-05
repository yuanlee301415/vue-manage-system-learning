import { LetterStatus } from "@/enums/letterStatus";

export class Letter {
    _id: string
    title: string
    status: LetterStatus
    createdAt: number

    constructor(letter: Letter = {} as Letter) {
        this._id = letter._id
        this.title = letter.title
        this.status = letter.status
        this.createdAt = letter.createdAt
    }
}
