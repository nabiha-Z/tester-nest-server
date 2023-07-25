import { Types } from "mongoose";

export class NewMessageDto {
    content: string;
    sender: Types.ObjectId
}