import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth/strategy/jwt.auth.guard';

@ApiBearerAuth() // con esto protegemos ciertas rutas... mas adelante se dice cual si y cual no
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
    //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Post()
  async Usercreate(@Res() res, @Body() createUserDto: CreateUserDto) {
    const UserCre = await this.usersService.createUser(createUserDto);
    return res.status(HttpStatus.OK).json(UserCre);
  }

  @Get()
  async UserfindAll(@Res() res) {
    const UserAll = await this.usersService.findAllUser();
    return res.status(HttpStatus.OK).json(UserAll);
  }

  @Get(':id')
  async UserfindOne(@Res() res, @Param('id') id: string) {
    const OneUser = await this.usersService.findOneUser(id);
    return res.status(HttpStatus.OK).json(OneUser);
  }

      //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async Userupdate(
    @Res() res,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const UserUpdate = await this.usersService.updateUser(id, updateUserDto);
    return res.status(HttpStatus.OK).json(UserUpdate);
  }
      //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async Userremove(@Res() res, @Param('id') id: string) {
    const UserRemove = await this.usersService.removeUser(id);
    return res.status(HttpStatus.OK).json(UserRemove);
  }
}
