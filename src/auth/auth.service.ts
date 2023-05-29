import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(usuario: any) {
    delete usuario.dataValues.senha;

    const payload = usuario.dataValues;

    return {
      token: this._jwtService.sign(payload),
    };
  }

  async validateUser(cim: string, senha: string, palavra_chave: string) {
    const usuario = await this._usuarioService.findByCim(cim);

    if (!usuario) {
      throw new NotFoundException(
        `Nenhum usuario com o CIM ${cim} foi encontrado`,
      );
    }

    const senhaValida = compareSync(senha, usuario.senha);

    if (!senhaValida) {
      throw new UnauthorizedException('Senha incorreta!');
    }

    return usuario;
  }
}
