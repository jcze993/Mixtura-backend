export class CreatePedidoDto {
 readonly Platos:   {
  readonly _idPlato:string,
  readonly Titulo:string,
  readonly Precio:number,
  readonly CantidadPlatos:number,
  readonly SubTotal:number
 }[];
 readonly N_de_Pedidos:number;
 readonly Total_A_Pagar?: number;
 readonly Estado?:boolean;
 createAt?:Date;
}
