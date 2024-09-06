export class UpdateMenuDto {
  readonly title?: string;
  imgURL?: string;
  readonly precio?: number;
  readonly descripcion?: string;
  public_id?: string;
  readonly categoria?: string;
  readonly createdAt: Date;
}
