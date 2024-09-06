import { Module } from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { GalleryController } from './gallery.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { GallerySchema } from './Schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'galerias', schema: GallerySchema }]),
  ],
  controllers: [GalleryController],
  providers: [GalleryService],
})
export class GalleryModule {}
