import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { RetornoApi } from '../interface/retornoApi.model';

export const notFoundReturn = (mensagem: string): RetornoApi => {
  return {
    status: HttpStatus.NOT_FOUND,
    mensagem: mensagem,
    dados: null,
    timezone: moment().format(),
  };
};
