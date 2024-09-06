import { Injectable } from '@nestjs/common';
import { LazyModuleLoader } from '@nestjs/core';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateMenuDto, UpdateMenuDto } from './dto';
import { Menu } from './interfaz';

@Injectable()
export class MenuService {
  constructor(
    @InjectModel('platos') private readonly menuModel: Model<Menu>,
    private lazyModuleLoader: LazyModuleLoader,
  ) {}
  async Menucreate(createMenuDto: CreateMenuDto): Promise<Menu> {
    const MenuNew = new this.menuModel(createMenuDto);
    return await MenuNew.save();
  }

  async MenufindAll(): Promise<Menu[]> {
    const MenuAll = await this.menuModel.find();
    return MenuAll;
  }

  async MenufindOne(id: string): Promise<Menu> {
    const MenuOne = await this.menuModel.findById(id);
    return MenuOne;
  }

  async Menuupdate(id: string, updateMenuDto: UpdateMenuDto): Promise<Menu> {
    const Menuupdate = await this.menuModel.findByIdAndUpdate(
      id,
      updateMenuDto,
      { new: true }, //para devolver el nuevo valor
    );
    return Menuupdate;
  }

  async Menuremove(id: string): Promise<Menu> {
    const Menuremove = await this.menuModel.findByIdAndRemove(id);
    return Menuremove;
  }
}
