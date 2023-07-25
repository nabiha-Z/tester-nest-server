import { Types } from "mongoose";
import { Message } from "../schemas/message.schema";

export class NewChatDto {
    messages: Message[];
    sender: Types.ObjectId;
    receiver: Types.ObjectId;
}