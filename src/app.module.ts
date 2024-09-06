import { CoreModule } from '@core/core.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
/* 
import {
  GalleryModule,
  HealthinessSanidadModule,
  MenuModule,
  UsersModule,
  PedidosModule,
  
} from './shared'; */
import { AuthModule } from "./core";
import { SharedModule } from './shared';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      //'mongodb+srv://root:root@cluster0.xz1d6.gcp.mongodb.net/RM?retryWrites=true&w=majority',
      process.env.db,
    ),
/*     UsersModule,
    HealthinessSanidadModule,
    MenuModule,
    GalleryModule,
    PedidosModule,
    AuthModule */
    SharedModule,
    CoreModule
  ],
})
export class AppModule {}
