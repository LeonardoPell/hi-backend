import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { RetornoApi } from '../interface/retornoApi.model';

export const createdReturn = (mensagem: string, dados: any): RetornoApi => {
  return {
    status: HttpStatus.CREATED,
    mensagem: mensagem,
    dados: dados,
    timezone: moment().format(),
  };
};
