/* import { Schema } from 'mongoose';
export const PedidosSchema = new Schema({
  Platos:[
  {
    _idPlato:String,
    Titulo:String,
    Precio:Number,
    CantidadPlatos:Number,
    SubTotal:Number
  }
 ],
  N_de_Pedidos:Number,
  Total_A_Pagar: Number,
  Estado:Boolean,
  CreateAt: {
   type: Date,
   default: Date.now,
 },
});
 */
import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
export type PedidosDocument = pedidos & Document;

@Schema()
export class pedidos{
  @Prop()
  Platos: {
    
    _idPlato:String;
    
    Titulo:String;

    Precio:Number;

    CantidadPlatos:Number;

    SubTotal:Number;
  } []
   @Prop()
   N_de_Pedidos:Number;
   
   @Prop()
   Total_A_Pagar: Number;

   @Prop()
   Estado:Boolean;
  
  @Prop({type:Date,default: Date.now()})
  createdAt: Date;
}
export const PedidosSchema = SchemaFactory.createForClass(pedidos)