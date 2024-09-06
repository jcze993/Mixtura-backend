import { Document } from 'mongoose';
export interface Menu extends Document {
  readonly title: string;
  readonly imgURL: string;
  readonly precio: number;
  readonly descripcion: string;
  readonly Url: string;
  readonly public_id: string;
  readonly categoria: string;
  img?: File;
  readonly createdAt: Date;
}
