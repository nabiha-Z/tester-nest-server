
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true })
export class Message {

  @Prop({ type: Types.ObjectId, ref: 'User' })
  sender: User;

  @Prop()
  content: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);