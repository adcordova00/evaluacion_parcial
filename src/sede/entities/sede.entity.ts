import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Empleado } from '../../empleado/entities/empleado.entity';
import { Venta } from '../../venta/entities/venta.entity';

@Entity()
export class Sede {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  nombre: string;

  @Column({ length: 255 })
  direccion: string;

  @Column({ length: 50, nullable: true })
  ciudad?: string;

  @Column({ length: 15, nullable: true })
  telefono?: string;

  @OneToMany(() => Empleado, (empleado) => empleado.sede)
  empleados: Empleado[];

  @OneToMany(() => Venta, (venta) => venta.sede)
  ventas: Venta[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
