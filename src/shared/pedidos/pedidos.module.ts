import { Module } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { PedidosController } from './pedidos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PedidosSchema } from './schema/pedidos.schema';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'pedidos', schema: PedidosSchema }]),
  ],
  controllers: [PedidosController],
  providers: [PedidosService]
})
export class PedidosModule {}
