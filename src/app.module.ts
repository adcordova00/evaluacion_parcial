import 'dotenv/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ClienteModule } from './cliente/cliente.module';
import { ProductoModule } from './producto/producto.module';
import { VentaModule } from './venta/venta.module';
import { EmpleadoModule } from './empleado/empleado.module';
import { SedeModule } from './sede/sede.module';
import { Cliente } from './cliente/entities/cliente.entity';
import { Producto } from './producto/entities/producto.entity';
import { Venta } from './venta/entities/venta.entity';
import { Empleado } from './empleado/entities/empleado.entity';
import { Sede } from './sede/entities/sede.entity';

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true, envFilePath: '.env',}),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port:  parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: [Cliente, Producto, Venta, Empleado, Sede],
      synchronize: true,
    }),
    ClienteModule,
    ProductoModule,
    VentaModule,
    EmpleadoModule,
    SedeModule,
  ],
})
export class AppModule {}
