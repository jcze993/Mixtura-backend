export class CreateMenuDto {
  readonly title: string;
  readonly precio: number;
  readonly descripcion: string;
  readonly categoria: string;
  public_id: string;
  imgURL: string;
  img?: File;
  readonly createdAt: Date;
}
