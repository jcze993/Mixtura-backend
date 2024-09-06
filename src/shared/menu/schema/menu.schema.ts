/* import { Schema } from 'mongoose';
export const MenuSchema = new Schema({
  
  title: String,
  precio: Number,
  descripcion: String,
  categoria: String,
  imgURL: String,
  public_id: String,
  CreateAt: {
    type: Date,
    default: Date.now,
  },
}); */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type MenuDocument = menu & Document;

@Schema()
export class menu{
  @Prop()
  title: String;
  
  @Prop()
  precio:Number;

  @Prop()
  descripcion: String;

  @Prop()
  categoria: String;
  
  @Prop()
  imgURL: String;
  
  @Prop()
  public_id: String;
  
  @Prop({type:Date,default: Date.now()})
  createdAt: Date;
}
export const MenuSchema = SchemaFactory.createForClass(menu)
