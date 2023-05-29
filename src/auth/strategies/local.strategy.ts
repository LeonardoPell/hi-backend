import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _authService: AuthService) {
    super({
      usernameField: 'cim',
      passwordField: 'senha',
    });
  }

  async validate(cim: string, senha: string) {
    const senhaFiltrada = senha.split('|palavra_chave|')[0];
    const palavra_chave = senha.split('|palavra_chave|')[1];
    const usuario = await this._authService.validateUser(
      cim,
      senhaFiltrada,
      palavra_chave,
    );

    return usuario;
  }
}
