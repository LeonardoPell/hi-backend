import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: String(process.env.HOST),
      port: Number(process.env.PORT),
      username: String(process.env.USERNAME),
      password: String(process.env.PASSWORD),
      database: String(process.env.DATABASE),
      autoLoadModels: true,
      synchronize: false,
    }),
  ],
})
export class DatabaseModule {}
