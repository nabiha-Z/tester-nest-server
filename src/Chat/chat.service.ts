import { Injectable, Param, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Chat } from './schemas/chat.schema';
import { NewMessageDto } from './dto/new-message.dto';
import { Message } from './schemas/message.schema';
import { NewChatDto } from './dto/new-chat.dto';
@Injectable()
export class ChatService {
  constructor(@InjectModel(Chat.name) private chatModel: Model<Chat>,
  @InjectModel(Message.name) private messageModel: Model<Message>) {}

  async createChat(chat: NewChatDto): Promise<Chat> {
    const existingChat = await this.chatModel.find({ $and: [{receiver: chat.receiver}, {sender: chat.sender}] })
    if(existingChat.length > 0){
      throw new ForbiddenException('Chat with this user already exists');
    }
    const createdChat = new this.chatModel(chat);
    return createdChat.save();
  }

  async findAll(): Promise<Chat[]> {
    const chats = await this.chatModel.find().populate({
      path: 'messages',
      model: 'Message'
    }).exec();
    return chats
  }

  async find(id: Types.ObjectId): Promise<Chat> {
    return await this.chatModel.findById(id).exec();
  }

  async createMessage(message: object): Promise<Message> {
    const newMessage = await this.messageModel.create(message)
    return newMessage;
  }

  async updateChat(id: string, messages:Types.ObjectId[]): Promise<void> {
    await this.chatModel.findOneAndUpdate({_id: id}, {messages}, {new: true})
  }

  async getUserChats(id: Types.ObjectId): Promise<Chat[]> {
    return await this.chatModel.find({ $or: [{receiver: id}, {sender: id}] }).populate('sender').populate('receiver')
  }

  async getConversation(senderId: Types.ObjectId, chatId: string): Promise<Chat[]> {
    const chats = await this.chatModel.find({_id: chatId})
    .populate({
      path: 'messages',
      model: 'Message'
    })
    return chats
  }
}