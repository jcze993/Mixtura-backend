import { Controller, Get, Post, Body, Param, Delete, Res, Put, HttpStatus, UseGuards } from '@nestjs/common';
import { PedidosService } from './pedidos.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@core/auth';

@ApiBearerAuth() // con esto protegemos ciertas rutas... mas adelante se dice cual si y cual no
@ApiTags('Pedidos')
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pedidosService: PedidosService) {}

  @Post()
  async create(@Body() createPedidoDto: CreatePedidoDto,@Res() res) {
    const PedidoCreate = this.pedidosService.createPedidos(createPedidoDto);
    return res.status(HttpStatus.OK).json(PedidoCreate);
  }

  @Get()
  async findAll(@Res() res) {
    const Pedidos = await this.pedidosService.findAllPedidos();
    return res.status(HttpStatus.OK).json(Pedidos);
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res) {
    const OnePedido = await this.pedidosService.findOnePedidos(id);
    return res.status(HttpStatus.OK).json(OnePedido);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updatePedidoDto: UpdatePedidoDto,@Res() res) {
    const UpdatePedidos = await this.pedidosService.updatePedidos(id, updatePedidoDto);
    return res.status(HttpStatus.OK).json(UpdatePedidos);
  }
    //con este protegemos las lineas dice.... borraro para mas tarde y ponlo en el post, deled y edit..
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res) {
    const DeletedPedidos = await this.pedidosService.removePedidos(id);
    return res.status(HttpStatus.OK).json(DeletedPedidos);
  }
}
