import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './core/database.module';
import { UsuarioModule } from './modules/usuario/usuario.module';

@Module({
  imports: [DatabaseModule, UsuarioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
