import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { RetornoApi } from '../interface/retornoApi.model';

export const removedReturn = (mensagem: string): RetornoApi => {
  return {
    status: HttpStatus.OK,
    mensagem: mensagem,
    dados: null,
    timezone: moment().format(),
  };
};
