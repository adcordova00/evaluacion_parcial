import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Venta } from './entities/venta.entity';
import { VentaService } from './venta.service';
import { VentaController } from './venta.controller';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Sede } from '../sede/entities/sede.entity';
import { ClienteModule } from '../cliente/cliente.module';
import { ProductoModule } from '../producto/producto.module';
import { EmpleadoModule } from '../empleado/empleado.module';
import { SedeModule } from '../sede/sede.module';

@Module({
  imports: [TypeOrmModule.forFeature([Venta, Cliente, Producto, Empleado, Sede]), ClienteModule,
    ProductoModule,
    EmpleadoModule,
    SedeModule,],
  controllers: [VentaController],
  providers: [VentaService],
  exports: [TypeOrmModule], 
})
export class VentaModule { }
