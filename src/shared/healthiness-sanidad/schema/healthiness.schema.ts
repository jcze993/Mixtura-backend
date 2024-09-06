/* import { Schema } from 'mongoose';
export const HealthinessSchema = new Schema({
  title: String,
  descripcion: String,
  imgURL: String,
  public_id: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
 */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type HealthinessDocument = healthiness & Document;

@Schema()
export class healthiness{
  @Prop()
  title: String;
  
  @Prop()
  descripcion: String;
  
  @Prop()
  imgURL: String;
  
  @Prop()
  public_id: String;
  
  @Prop({type:Date,default: Date.now()})
  createdAt: Date;
}
export const HealthinessSchema = SchemaFactory.createForClass(healthiness)