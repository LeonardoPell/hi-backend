import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { PalavraSemestral } from 'src/modules/palavra_semestral/entities/palavra_semestral.entity';
import { Usuario } from 'src/modules/usuario/entities/usuario.entity';

@Module({
  imports: [
    SequelizeModule.forRoot({
      timezone: '-03:00',
      dialect: 'postgres',
      host: String(process.env.HOST),
      port: Number(process.env.PORT),
      username: String(process.env.USERNAME),
      password: String(process.env.PASSWORD),
      database: String(process.env.DATABASE),
      autoLoadModels: true,
      synchronize: false,
      define: {
        timestamps: false,
      },
      models: [Usuario,PalavraSemestral],
    }),
  ],
})
export class DatabaseModule {}
