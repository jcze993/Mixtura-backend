import { Test, TestingModule } from '@nestjs/testing';
import { HealthinessSanidadService } from './healthiness-sanidad.service';

describe('HealthinessSanidadService', () => {
  let service: HealthinessSanidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthinessSanidadService],
    }).compile();

    service = module.get<HealthinessSanidadService>(HealthinessSanidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
