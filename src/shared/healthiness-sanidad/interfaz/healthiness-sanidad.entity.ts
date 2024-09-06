import { Document } from 'mongoose';
export interface HealthinessSanidad extends Document {
  readonly title: string;
  readonly imgURL: string;
  readonly descripcion: string;
  readonly public_id: string;
  readonly createdAt: Date;
}
