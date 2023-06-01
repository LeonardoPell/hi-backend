import { Module } from '@nestjs/common';
import { PalavraSemestralService } from './palavra_semestral.service';
import { PalavraSemestralController } from './palavra_semestral.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { PalavraSemestral } from './entities/palavra_semestral.entity';

@Module({
  imports: [SequelizeModule.forFeature([PalavraSemestral])],
  controllers: [PalavraSemestralController],
  providers: [PalavraSemestralService],
  exports: [PalavraSemestralService]
})
export class PalavraSemestralModule {}
