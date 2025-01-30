import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sede } from './entities/sede.entity';
import { CreateSedeDto } from './dto/create-sede.dto';
import { UpdateSedeDto } from './dto/update-sede.dto';

@Injectable()
export class SedeService {
  constructor(
    @InjectRepository(Sede)
    private readonly sedeRepository: Repository<Sede>,
  ) {}

  async create(createSedeDto: CreateSedeDto): Promise<Sede> {
    const sede = this.sedeRepository.create(createSedeDto);
    return await this.sedeRepository.save(sede);
  }

  async findAll(): Promise<Sede[]> {
    return await this.sedeRepository.find();
  }

  async findOne(id: number): Promise<Sede> {
    const sede = await this.sedeRepository.findOne({ where: { id } });
    if (!sede) throw new NotFoundException(`Sede con ID ${id} no encontrada`);
    return sede;
  }

  async update(id: number, updateSedeDto: UpdateSedeDto): Promise<Sede> {
    const sede = await this.findOne(id);
    Object.assign(sede, updateSedeDto);
    return await this.sedeRepository.save(sede);
  }

  async remove(id: number): Promise<void> {
    const sede = await this.findOne(id);
    await this.sedeRepository.remove(sede);
  }
}
