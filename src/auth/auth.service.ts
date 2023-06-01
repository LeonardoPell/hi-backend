import { JwtService } from '@nestjs/jwt';
import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsuarioService } from 'src/modules/usuario/usuario.service';
import { compareSync } from 'bcrypt';
import { PalavraSemestralService } from 'src/modules/palavra_semestral/palavra_semestral.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly _usuarioService: UsuarioService,
    private readonly _palavraSemestralService: PalavraSemestralService,
    private readonly _jwtService: JwtService,
  ) {}

  async login(usuario: any) {
    delete usuario.dataValues.senha;

    const payload = usuario.dataValues;

    return {
      token: this._jwtService.sign(payload),
    };
  }

  async validateUser(cim: string, senha: string, palavra_semestral: string) {
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

    const palavra = await this._palavraSemestralService.findByWord(palavra_semestral);

    if(palavra.status !== HttpStatus.OK){
      throw new NotFoundException(
        `Palavra chave incorreta`,
      );
    }

    return usuario;
  }
}
