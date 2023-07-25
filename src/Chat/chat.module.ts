import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Message, MessageSchema } from './schemas/message.schema';
import { Chat, ChatSchema } from './schemas/chat.schema';
import { ChatService } from './chat.service';
import { ChatGateway } from './chat.gateway';
import { ChatController } from './chat.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Chat.name, schema: ChatSchema }, { name: Message.name, schema: MessageSchema }])],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway],
})
export class ChatModule {}