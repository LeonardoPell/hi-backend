import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { RetornoApi } from '../interface/retornoApi.model';

export const errorTryCatchReturn = (error: any): RetornoApi => {
  return {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    mensagem: 'Algum erro inesperado no servidor aconteceu',
    dados: error,
    timezone: moment().format(),
  };
};
