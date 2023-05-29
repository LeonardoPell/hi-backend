import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { RetornoApi } from '../interface/retornoApi.model';

export const foundReturn = (mensagem: string, dados: any): RetornoApi => {
  return {
    status: HttpStatus.OK,
    mensagem: mensagem,
    dados: dados,
    timezone: moment().format(),
  };
};
