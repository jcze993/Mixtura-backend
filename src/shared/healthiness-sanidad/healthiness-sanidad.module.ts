import { Module } from '@nestjs/common';
import { HealthinessSanidadService } from './healthiness-sanidad.service';
import { HealthinessSanidadController } from './healthiness-sanidad.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { HealthinessSchema } from './schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'solubridas', schema: HealthinessSchema },
    ]),
  ],
  controllers: [HealthinessSanidadController],
  providers: [HealthinessSanidadService],
})
export class HealthinessSanidadModule {}
