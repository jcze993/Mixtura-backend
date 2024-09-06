import { Document } from 'mongoose';

export interface uSer extends Document {
  readonly password: string;
  readonly Nm: string;
  readonly email: string;
  readonly nombre: string;
  readonly apellidos: string;
  readonly dirrecion: string;
  readonly CreateAt: Date;
}
