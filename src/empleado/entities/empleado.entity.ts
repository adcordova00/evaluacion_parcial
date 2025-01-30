import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Sede } from '../../sede/entities/sede.entity';

@Entity()
export class Empleado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ length: 100 })
  apellido: string;

  @Column({ unique: true })
  email: string;

  @Column({ length: 15, nullable: true })
  telefono?: string;

  @Column({ type: 'varchar', length: 50 })
  cargo: string;

  @ManyToOne(() => Sede, (sede) => sede.id, { nullable: false })
  sede: Sede;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
