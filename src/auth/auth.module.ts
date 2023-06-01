import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { UsuarioModule } from 'src/modules/usuario/usuario.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PalavraSemestralModule } from 'src/modules/palavra_semestral/palavra_semestral.module';

@Module({
  imports: [
    PassportModule,
    UsuarioModule,
    PalavraSemestralModule,
    JwtModule.register({
      privateKey: process.env.JWT,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
