import { LazyModuleLoader, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
//import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    //para la documen
    const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('La documentacion')
    .setDescription('Descripcion de la documentacion de la Api')
    .setVersion('1')
    .addTag('Galleria')
    .addTag('Solubridad')
    .addTag('Menu')
    .addTag('Pedidos')
    .addTag('Users')
    .addTag('Login')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  //ruta de a api
  SwaggerModule.setup('documentacion', app, document);
  //optimi...
  const lazyModuleLoader = app.get(LazyModuleLoader);
  app.enableCors(); //activa esto
  //lo de abajo dio problema por eso lo come...
  //app.use(csurf()); //para evitar la transmision de comands mali...
  await app.listen(process.env.PORT || 3000);

}
bootstrap();
