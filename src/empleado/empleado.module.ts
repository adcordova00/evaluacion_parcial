import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Empleado } from './entities/empleado.entity';
import { EmpleadoService } from './empleado.service';
import { EmpleadoController } from './empleado.controller';
import { Sede } from '../sede/entities/sede.entity';
import { SedeModule } from '../sede/sede.module';

@Module({
  imports: [TypeOrmModule.forFeature([Empleado, Sede]), SedeModule],
  controllers: [EmpleadoController],
  providers: [EmpleadoService],
  exports: [TypeOrmModule],
})
export class EmpleadoModule {}
