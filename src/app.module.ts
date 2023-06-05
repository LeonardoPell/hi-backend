import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database.module';
import { UsuarioModule } from './modules/usuario/usuario.module';
import { AuthModule } from './auth/auth.module';
import { PalavraSemestralModule } from './modules/palavra_semestral/palavra_semestral.module';
import { NivelObreiroModule } from './modules/nivel-obreiro/nivel-obreiro.module';
import { ReunioesModule } from './modules/reunioes/reunioes.module';
import { PresencaReuniaoModule } from './modules/presenca-reuniao/presenca-reuniao.module';

@Module({
  imports: [
    DatabaseModule,
    UsuarioModule,
    AuthModule,
    PalavraSemestralModule,
    NivelObreiroModule,
    ReunioesModule,
    PresencaReuniaoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
