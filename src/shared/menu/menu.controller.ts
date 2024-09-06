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
import { MenuService } from './menu.service';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v2 } from 'cloudinary';
import { JwtAuthGuard } from '@core/auth';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth() // con esto protegemos ciertas rutas... mas adelante se dice cual si y cual no
@ApiTags('Menu')
@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: 'imgs/menus',
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
  async createMenu(
    @Res() res,
    @Body() createMenuDto: CreateMenuDto,
    @UploadedFile() img: Express.Multer.File,
  ) {
    v2.config({
      cloud_name: 'dnmmrrqxz',
      api_key: '276441252589399',
      api_secret: 'TC1Bxh7d9OkqMC6Dqo8chEyZWnM',
    });
    const Img = await v2.uploader.upload(img.path, {
      folder: 'platos',
      resource_type: 'image',
      quality: 'auto:low',
      fetch_format: 'auto',
      format: 'WebP',
    });
    createMenuDto.public_id = await Img.public_id;
    createMenuDto.imgURL = await Img.url;
    console.log(createMenuDto);
    console.log(img);
    const MenuCreate = this.menuService.Menucreate(createMenuDto);
    return res.status(HttpStatus.OK).json(MenuCreate);
  }

  @Get()
  async findAllMenu(@Res() res) {
    const Menus = await this.menuService.MenufindAll();
    return res.status(HttpStatus.OK).json(Menus);
  }

  @Get(':id')
  async findOneMenu(@Res() res, @Param('id') id: string) {
    const OneMenu = await this.menuService.MenufindOne(id);
    return res.status(HttpStatus.OK).json(OneMenu);
  }
  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateMenu(
    @Res() res,
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
  ) {
    const UpdateMenu = await this.menuService.Menuupdate(id, updateMenuDto);
    return res.status(HttpStatus.OK).json(UpdateMenu);
  }
  //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async removeMenu(@Res() res, @Param('id') id: string) {
    const DeletedMenu = await this.menuService.Menuremove(id);
    const elminarclau = await v2.uploader.destroy(DeletedMenu.public_id);
    return res.status(HttpStatus.OK).json(DeletedMenu);
  }
}
