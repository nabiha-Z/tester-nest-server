import * as mongoose from 'mongoose';
import { MessageSchema } from './message.schema';

// export const Message = new mongoose.Schema({
//   content: String,
//   timestamp: { type: Date, default: Date.now },
// });

// export const Chat = new mongoose.Schema({
//   reciever: { type: mongoose.Types.ObjectId, ref: 'User' },
//   sender: { type: mongoose.Types.ObjectId, ref: 'User' },
//   messages: [MessageSchema]
// }, {timestamps: true});

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from '../../User/schemas/user.schema'
import { Message } from './message.schema';

export type ChatDocument = Chat & Document;

@Schema({ timestamps: true })
export class Chat {
  @Prop({ type: Types.ObjectId, ref: 'User' })
  receiver: User;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: User;

  // @Prop({ type: [MessageSchema] })
  // messages: Message[];

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Message' }] })
  messages: Types.ObjectId[];

  createdAt: Date;
  updatedAt: Date;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);