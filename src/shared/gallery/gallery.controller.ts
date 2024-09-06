import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto, UpdateGalleryDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v2 } from 'cloudinary';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth';

@ApiBearerAuth() // con esto protegemos ciertas rutas... mas adelante se dice cual si y cual no
@ApiTags('Galleria')
@Controller('galeria')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: 'imgs/gallery',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async create_Gallery(
    @Res() res,
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    v2.config({
      cloud_name: 'dnmmrrqxz',
      api_key: '276441252589399',
      api_secret: 'TC1Bxh7d9OkqMC6Dqo8chEyZWnM',
    });
    const Img = await v2.uploader.upload(img.path, {
      folder: 'gale',
      resource_type: 'image',
      quality: 'auto:low',
      fetch_format: 'auto',
      format: 'WebP',
    });
    createGalleryDto.public_id = await Img.public_id;
    createGalleryDto.imgURL = await Img.url;
    console.log(createGalleryDto);
    console.log(img);
    const CGC = await this.galleryService.Gallery_create(createGalleryDto);
    return res.status(HttpStatus.OK).json(CGC);
  }

  @Get()
  async findAll_Gallery(@Res() res) {
    const FGC = await this.galleryService.Gallery_findAll();
    return res.status(HttpStatus.OK).json(FGC);
  }

  @Get(':id')
  async findOne_Gallery(@Res() res, @Param('id') id: string) {
    const OGC = await this.galleryService.Gallery_findOne(id);
    return res.status(HttpStatus.OK).json(OGC);
  }
  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update_Gallery(
    @Res() res,
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
  ) {
    const UGC = await this.galleryService.Gallery_update(id, updateGalleryDto);
    return res.status(HttpStatus.OK).json(UGC);
  }
  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove_Gallery(@Res() res, @Param('id') id: string) {
    const RGC = await this.galleryService.Gallery_remove(id);
    const elminarclau = await v2.uploader.destroy(RGC.public_id);
    return res.status(HttpStatus.OK).json(RGC);
  }
}
