import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserSchema, UsersModule } from '@shared/users';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    JwtModule.register({
      secret: "esto_cambias_por_las_varialbes..."/* process.env.jwt_secret */,
      //el token va a expierar en 20 horas
      signOptions: { expiresIn: '20h' },
    }),
  ],
  controllers: [AuthController],
  //aki esta haciendo uso de jwtstrte...creado ejej
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
