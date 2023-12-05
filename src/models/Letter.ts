import { LetterStatus } from "@/enums/letterStatus";

export class Letter {
    _id: string
    title: string
    createdAt: number
    status: LetterStatus

    constructor(_: Letter = {} as Letter) {
        const { _id, title, createdAt, status } = { ..._ }
        this._id = _id
        this.title = title
        this.createdAt = createdAt
        this.status = status
    }
}
