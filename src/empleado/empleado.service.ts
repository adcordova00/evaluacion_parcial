import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Empleado } from './entities/empleado.entity';
import { CreateEmpleadoDto } from './dto/create-empleado.dto';
import { UpdateEmpleadoDto } from './dto/update-empleado.dto';
import { Sede } from '../sede/entities/sede.entity';

@Injectable()
export class EmpleadoService {
  constructor(
    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,

    @InjectRepository(Sede)
    private readonly sedeRepository: Repository<Sede>,
  ) {}

  async create(createEmpleadoDto: CreateEmpleadoDto): Promise<Empleado> {
    const sede = await this.sedeRepository.findOne({ where: { id: createEmpleadoDto.sede } });
    if (!sede) throw new NotFoundException(`Sede con ID ${createEmpleadoDto.sede} no encontrada`);

    const empleado = this.empleadoRepository.create({ ...createEmpleadoDto, sede });
    return await this.empleadoRepository.save(empleado);
  }

  async findAll(): Promise<Empleado[]> {
    return await this.empleadoRepository.find({ relations: ['sede'] });
  }

  async findOne(id: number): Promise<Empleado> {
    const empleado = await this.empleadoRepository.findOne({ where: { id }, relations: ['sede'] });
    if (!empleado) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    return empleado;
  }

  async update(id: number, updateEmpleadoDto: UpdateEmpleadoDto): Promise<Empleado> {
    const empleado = await this.findOne(id);

    if (updateEmpleadoDto.sede) {
      const sede = await this.sedeRepository.findOne({ where: { id: updateEmpleadoDto.sede } });
      if (!sede) throw new NotFoundException(`Sede con ID ${updateEmpleadoDto.sede} no encontrada`);
      empleado.sede = sede;
    }

    Object.assign(empleado, updateEmpleadoDto);
    return await this.empleadoRepository.save(empleado);
  }

  async remove(id: number): Promise<void> {
    const empleado = await this.findOne(id);
    await this.empleadoRepository.remove(empleado);
  }
}
