/* import { Schema } from 'mongoose';
export const UserSchema = new Schema({
  nombre: String,
  apellidos: String,
  email: String,
  Nm: String,
  Img: String,
  dirrecion: String,
  password: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});
 */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
/* import * as bcrypt from 'bcryptjs'; */

export type UserDocument = User & Document;

@Schema()
export class User {
/*   @Prop({required: false})
  _id?: string;
 */
  @Prop()
  nombre: string;

  @Prop()
  apellidos: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  Nm: string;

  @Prop()
  Img: string;

  @Prop()
  dirrecion: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

/*   async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
  } */
}

export const UserSchema = SchemaFactory.createForClass(User);
