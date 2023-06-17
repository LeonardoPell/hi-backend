import { HttpStatus } from '@nestjs/common';
import * as moment from 'moment';
import { RetornoApi } from '../interface/retornoApi.model';

export const internalServerErrorReturn = (
  error: any,
  message: string,
): RetornoApi => {
  return {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    mensagem: `Algum erro inesperado no servidor aconteceu ao tentar ${message}`,
    dados: error,
    timezone: moment().format(),
  };
};
