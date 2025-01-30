import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Cliente } from '../../cliente/entities/cliente.entity';
import { Producto } from '../../producto/entities/producto.entity';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Sede } from '../../sede/entities/sede.entity';

@Entity()
export class Venta {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Cliente, (cliente) => cliente.id, { nullable: false })
  cliente: Cliente;

  @ManyToOne(() => Producto, (producto) => producto.id, { nullable: false })
  producto: Producto;

  @ManyToOne(() => Empleado, (empleado) => empleado.id, { nullable: false })
  empleado: Empleado;

  @ManyToOne(() => Sede, (sede) => sede.id, { nullable: false })
  sede: Sede;

  @Column({ type: 'int', default: 1 })
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn()
  fechaVenta: Date;
}
