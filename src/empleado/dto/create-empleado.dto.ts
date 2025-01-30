import { IsString, IsEmail, IsOptional, IsNumber } from 'class-validator';

export class CreateEmpleadoDto {
  @IsString()
  nombre: string;

  @IsString()
  apellido: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsString()
  cargo: string;

  @IsNumber()
  sede: number;
}
