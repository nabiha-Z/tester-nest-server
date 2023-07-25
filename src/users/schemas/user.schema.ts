import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ required: true })
  name: string;
  
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre<User>('save', async function() {
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods.isValidPassword = async function (password: string) {
  const user = this
  const compare = await bcrypt.compare(password, user.password)

  return compare
}
