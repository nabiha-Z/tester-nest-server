import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Request } from "express";
import { Req, UseGuards} from "@nestjs/common";
import { Server } from 'socket.io';

import { NewMessageDto } from './dto/new-message.dto';
import { ChatService } from './chat.service';
import { ChatGuard } from "./chat.guard";
@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000/',
    credentials: true,
  },
})

export class ChatGateway {
  constructor(private readonly chatService: ChatService,
    ) {}
  @WebSocketServer()
  server:Server;

  @UseGuards(ChatGuard)
  @SubscribeMessage('message')
   async handleMessage(@MessageBody() message: string, @Req() request: Request): Promise<void>{

    const chat = await this.chatService.find(message['chatId']);
    const messages  = chat.messages;
    const newMessage: NewMessageDto = { content: message['data'], sender:request['current_user'].id };
    const createdMessage = await this.chatService.createMessage(newMessage);
    const messageId = createdMessage['id'];
    
    messages.push(messageId);
    await this.chatService.updateChat(message['chatId'], messages)
    this.server.emit('message', createdMessage);
  }
}
