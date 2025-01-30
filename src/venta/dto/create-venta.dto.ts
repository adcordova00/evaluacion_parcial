import { IsNumber } from 'class-validator';

export class CreateVentaDto {
  @IsNumber()
  cliente: number;

  @IsNumber()
  producto: number;

  @IsNumber()
  empleado: number;

  @IsNumber()
  sede: number;

  @IsNumber()
  cantidad: number;

  @IsNumber()
  total: number;
}
