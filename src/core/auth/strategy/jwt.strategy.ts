import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "esto_cambias_por_las_varialbes..."/* process.env.jwt_secret */,
    });
  }

  async validate(payload: any) {
    //return { userId: payload.sub, username: payload.username }; 
    //si falla aver comenta el de abajo
    return { id: payload._id, apellidos: payload.apellidos };
  }
}