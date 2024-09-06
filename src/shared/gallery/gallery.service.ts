import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateGalleryDto, CreateGalleryDto } from './dto';
import { Gallery } from './interfaz';

@Injectable()
export class GalleryService {
  constructor(
    @InjectModel('galerias') private readonly galleryModel: Model<Gallery>,
    //si algo falla prueba borradno esto
    private lazyModuleLoader: LazyModuleLoader,
  ) {}
  async Gallery_create(createGalleryDto: CreateGalleryDto): Promise<Gallery> {
    const GC = new this.galleryModel(createGalleryDto);
    return await GC.save();
  }

  async Gallery_findAll(): Promise<Gallery[]> {
    const GF = await this.galleryModel.find();
    return GF;
  }

  async Gallery_findOne(id: string): Promise<Gallery> {
    const GFO = await this.galleryModel.findById(id);
    return GFO;
  }

  async Gallery_update(
    id: string,
    updateGalleryDto: UpdateGalleryDto,
  ): Promise<Gallery> {
    const GU = await this.galleryModel.findByIdAndUpdate(id, updateGalleryDto, {
      new: true,
    });
    return GU;
  }

  async Gallery_remove(id: string): Promise<Gallery> {
    const GR = await this.galleryModel.findByIdAndDelete(id);
    return GR;
  }
}
