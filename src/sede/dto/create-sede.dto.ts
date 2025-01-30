import { IsString, IsOptional } from 'class-validator';

export class CreateSedeDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  telefono?: string;
}
