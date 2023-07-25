import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';

import { ChatService } from './chat.service';
import { Chat } from './schemas/chat.schema';
import { NewChatDto } from './dto/new-chat.dto';
import { AuthGuard } from 'src/Auth/auth.guard';

@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async findAll(): Promise<Chat[]> {
    return this.chatService.findAll()
  }

  @UseGuards(AuthGuard)
  @Post('create')
  async create(@Body() newChatDto: NewChatDto, @Req() request: Request):Promise<Chat>{
    newChatDto.sender = request['user'].id
    return this.chatService.createChat(newChatDto)
  }

  @UseGuards(AuthGuard)
  @Get('user')
  async findUserChats(@Req() request: Request):Promise<Chat[]>{
    return await this.chatService.getUserChats(request['user'].id)
  }

  @UseGuards(AuthGuard)
  @Get('conversation/:rid')
  async findConversation(@Req() request: Request, @Param('rid') rid: string):Promise<Chat[]>{
    return await this.chatService.getConversation(request['user'].id, rid)
  }

}