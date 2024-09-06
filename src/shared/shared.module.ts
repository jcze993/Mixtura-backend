import { Module } from '@nestjs/common';
import { GalleryModule } from './gallery';
import { HealthinessSanidadModule } from './healthiness-sanidad';
import { MenuModule } from './menu';
import { PedidosModule } from './pedidos';
import { UsersModule } from './users';

@Module({
 imports:[
  MenuModule,
  GalleryModule,
  HealthinessSanidadModule,
  PedidosModule,
  UsersModule],
  exports:[
   MenuModule,
   GalleryModule,
   HealthinessSanidadModule,
   PedidosModule,
   UsersModule]
})
export class SharedModule {}
//si algo falla en login.... quita esto
//@ApiBearerAuth() // con esto protegemos ciertas rutas... mas adelante se dice cual si y cual no
  //y esto 
//con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
    //@UseGuards(JwtAuthGuard)
