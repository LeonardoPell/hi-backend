import { IsArray, IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreatePresencaReuniaoDto {
    @IsOptional()
    @IsNumber()
    id?: number;
  
    @IsNotEmpty()
    @IsNumber()
    id_reuniao: number;

    @IsNotEmpty()
    @IsArray()
    usuarios_presentes: number[];
}
