import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  UpdateHealthinessSanidadDto,
  CreateHealthinessSanidadDto,
} from './dto';
import { HealthinessSanidad } from './interfaz';

@Injectable()
export class HealthinessSanidadService {
  constructor(
    @InjectModel('solubridas')
    private readonly healthinessModel: Model<HealthinessSanidad>,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}
  async createHealthiness(
    createHealthinessSanidadDto: CreateHealthinessSanidadDto,
  ): Promise<HealthinessSanidad> {
    const HealthinessNew = new this.healthinessModel(
      createHealthinessSanidadDto,
    );
    return await HealthinessNew.save();
  }

  async findAllHealthiness(): Promise<HealthinessSanidad[]> {
    const HealthinessAll = await this.healthinessModel.find();
    return HealthinessAll;
  }

  async findOneHealthine(id: string): Promise<HealthinessSanidad> {
    const HealthinessOne = await this.healthinessModel.findById(id);
    return HealthinessOne;
  }

  async updateHealthine(
    id: string,
    updateHealthinessSanidadDto: UpdateHealthinessSanidadDto,
  ): Promise<HealthinessSanidad> {
    const HealthinessUpdate = await this.healthinessModel.findByIdAndUpdate(
      id,
      updateHealthinessSanidadDto,
    );
    return HealthinessUpdate;
  }

  async removeHealthiness(id: string): Promise<HealthinessSanidad> {
    const HealthinessDeleted = await this.healthinessModel.findByIdAndDelete(
      id,
    );
    return HealthinessDeleted;
  }
}
