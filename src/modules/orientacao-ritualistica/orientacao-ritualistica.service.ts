import { Injectable } from '@nestjs/common';
import { CreateOrientacaoRitualisticaDto } from './dto/create-orientacao-ritualistica.dto';
import { UpdateOrientacaoRitualisticaDto } from './dto/update-orientacao-ritualistica.dto';
import { OrientacaoRitualistica } from './entities/orientacao-ritualistica.entity';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrientacaoRitualisticaService {

  constructor(
    @InjectModel(OrientacaoRitualistica)
    private readonly orientacaoRitualistica: typeof OrientacaoRitualistica,
  ){}

  create(createOrientacaoRitualisticaDto: CreateOrientacaoRitualisticaDto) {
    return 'This action adds a new orientacaoRitualistica';
  }

  findAll() {
    return `This action returns all orientacaoRitualistica`;
  }

  findOne(id: number) {
    return `This action returns a #${id} orientacaoRitualistica`;
  }

  update(id: number, updateOrientacaoRitualisticaDto: UpdateOrientacaoRitualisticaDto) {
    return `This action updates a #${id} orientacaoRitualistica`;
  }

  remove(id: number) {
    return `This action removes a #${id} orientacaoRitualistica`;
  }
}
