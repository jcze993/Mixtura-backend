import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Res,
  HttpStatus,
  Put,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { HealthinessSanidadService } from './healthiness-sanidad.service';
import {
  CreateHealthinessSanidadDto,
  UpdateHealthinessSanidadDto,
} from './dto';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v2 } from 'cloudinary';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth';

@ApiBearerAuth() // con esto protegemos ciertas rutas... mas adelante se dice cual si y cual no
@ApiTags('Solubridad')
@Controller('sanidad')
export class HealthinessSanidadController {
  constructor(
    private readonly healthinessSanidadService: HealthinessSanidadService,
  ) {}
  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: 'imgs/hs',
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
  async HealthinessCreate(
    @Res() res,
    @Body() createHealthinessSanidadDto: CreateHealthinessSanidadDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    v2.config({
      cloud_name: 'dnmmrrqxz',
      api_key: '276441252589399',
      api_secret: 'TC1Bxh7d9OkqMC6Dqo8chEyZWnM',
    });
    const Img = await v2.uploader.upload(img.path, {
      folder: 'Doc',
      resource_type: 'image',
      quality: 'auto:low',
      fetch_format: 'auto',
      format: 'WebP',
    });
    createHealthinessSanidadDto.public_id = await Img.public_id;
    createHealthinessSanidadDto.imgURL = await Img.url;
    console.log(createHealthinessSanidadDto);
    console.log(img);
    const healthinessCreate =
      await this.healthinessSanidadService.createHealthiness(
        createHealthinessSanidadDto,
      );
    return res.status(HttpStatus.OK).json(healthinessCreate);
  }

  @Get()
  async HealthinessFindAll(@Res() res) {
    const healthinessAll =
      await this.healthinessSanidadService.findAllHealthiness();
    return res.status(HttpStatus.OK).json(healthinessAll);
  }

  @Get(':id')
  async HealthinessFindOne(@Res() res, @Param('id') id: string) {
    const OneHealthiness =
      await this.healthinessSanidadService.findOneHealthine(id);
    return res.status(HttpStatus.OK).json(OneHealthiness);
  }
  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async HealthinessUpdate(
    @Res() res,
    @Param('id') id: string,
    @Body() updateHealthinessSanidadDto: UpdateHealthinessSanidadDto,
  ) {
    const UpdateHealthiness =
      await this.healthinessSanidadService.updateHealthine(
        id,
        updateHealthinessSanidadDto,
      );
    return res.status(HttpStatus.OK).json(UpdateHealthiness);
  }
  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async HealthinessRemove(@Res() res, @Param('id') id: string) {
    const DeletedHealthiness =
      await this.healthinessSanidadService.removeHealthiness(id);
    const elminarclau = await v2.uploader.destroy(DeletedHealthiness.public_id);
    return res.status(HttpStatus.OK).json(DeletedHealthiness);
  }
}
