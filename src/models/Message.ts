import { MessageStatus } from "@/enums/messageStatus";

export class Message {
    id: number
    title: string
    date: number
    status: MessageStatus
    constructor(_: Message) {
        const { id, title, date, status } = { ..._ }
        this.id = id
        this.title = title
        this.date = date
        this.status = status
    }
}
