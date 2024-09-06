import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pedidos } from './interfaz';
import { CreatePedidoDto,UpdatePedidoDto } from './dto';

@Injectable()
export class PedidosService {
  constructor(
    @InjectModel('pedidos') private readonly pedidosModel: Model<Pedidos>,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}
  async createPedidos(createPedidoDto: CreatePedidoDto) {
    const PedidoNew = new this.pedidosModel(createPedidoDto);
    return await PedidoNew.save();
  }

  async findAllPedidos() : Promise<Pedidos[]> {
    const AllPedidos = await this.pedidosModel.find();
    return AllPedidos;
  }

  async findOnePedidos(id: string): Promise<Pedidos> {
    const PedidoOne = await this.pedidosModel.findById(id);
    return PedidoOne;
  }

  async updatePedidos(id: string, UpdatePedidosDto: UpdatePedidoDto): Promise<Pedidos> {
    const PedidosUpdate = await this.pedidosModel.findByIdAndUpdate(
      id,
      UpdatePedidosDto,
      { new: true }, //para devolver el nuevo valor
    );
    return PedidosUpdate;
  }

  async removePedidos(id: string): Promise<Pedidos> {
    const Pedidoremove = await this.pedidosModel.findByIdAndRemove(id);
    return Pedidoremove;
  }
}