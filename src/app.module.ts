import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { PalavraSemestralModule } from './modules/palavra_semestral/palavra_semestral.module';

@Module({
  imports: [DatabaseModule, UsuarioModule, AuthModule, PalavraSemestralModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
