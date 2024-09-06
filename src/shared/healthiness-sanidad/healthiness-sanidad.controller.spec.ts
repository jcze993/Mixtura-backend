import { Test, TestingModule } from '@nestjs/testing';
import { HealthinessSanidadController } from './healthiness-sanidad.controller';
import { HealthinessSanidadService } from './healthiness-sanidad.service';

describe('HealthinessSanidadController', () => {
  let controller: HealthinessSanidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthinessSanidadController],
      providers: [HealthinessSanidadService],
    }).compile();

    controller = module.get<HealthinessSanidadController>(
      HealthinessSanidadController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
