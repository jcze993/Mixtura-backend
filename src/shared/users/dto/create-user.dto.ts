export class CreateUserDto {
  readonly _id?: string;
  readonly password: string;
  readonly Nm: string;
  readonly email: string;
  readonly nombre: string;
  readonly apellidos: string;
  readonly dirrecion: string;
  readonly createAt: Date;
}
