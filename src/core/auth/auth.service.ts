import { HttpCode, HttpException, Injectable } from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Model } from 'mongoose';
import { User } from '@shared/users/schema/';
import { InjectModel } from '@nestjs/mongoose';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jws: JwtService,
  ) {}
  async login(LoginDto: UpdateAuthDto) {
    const { email, password } = LoginDto;
    const findUser = await this.userModel.findOne({ email });
    if (!findUser) throw new HttpException('No se encontro el correo', 404);
    //aki estamos comparando la calve registrada con la clave registrada
    const checkPaswword = await compare(password, findUser.password);
    if (!checkPaswword) throw new HttpException('contraseña incorrecta', 403);
    // para el token solo va datos publicos no sensible
    const playload = { id: findUser._id, apellidos: findUser.apellidos };
    //para el token
    const token = await this.jws.sign(playload);
    //si la clave es incorecta se retorna los datos incorrectos
    const data = {
      User: findUser,
      token,
    };
    return data;
  }

  /*   findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  } */
}
