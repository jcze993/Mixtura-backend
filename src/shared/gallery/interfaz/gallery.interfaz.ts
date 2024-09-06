import { Document } from 'mongoose';
export interface Gallery extends Document {
  readonly title: string;
  readonly descripcion: string;
  readonly imgURL: string;
  readonly public_id: string;
  readonly createdAt: Date;
}
