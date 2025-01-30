import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Venta } from './entities/venta.entity';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';
import { Cliente } from '../cliente/entities/cliente.entity';
import { Producto } from '../producto/entities/producto.entity';
import { Empleado } from '../empleado/entities/empleado.entity';
import { Sede } from '../sede/entities/sede.entity';

@Injectable()
export class VentaService {
  constructor(
    @InjectRepository(Venta)
    private readonly ventaRepository: Repository<Venta>,

    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,

    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,

    @InjectRepository(Empleado)
    private readonly empleadoRepository: Repository<Empleado>,

    @InjectRepository(Sede)
    private readonly sedeRepository: Repository<Sede>,
  ) {}

  async create(createVentaDto: CreateVentaDto): Promise<Venta> {
    const cliente = await this.clienteRepository.findOne({ where: { id: createVentaDto.cliente } });
    if (!cliente) throw new NotFoundException(`Cliente con ID ${createVentaDto.cliente} no encontrado`);

    const producto = await this.productoRepository.findOne({ where: { id: createVentaDto.producto } });
    if (!producto) throw new NotFoundException(`Producto con ID ${createVentaDto.producto} no encontrado`);

    const empleado = await this.empleadoRepository.findOne({ where: { id: createVentaDto.empleado } });
    if (!empleado) throw new NotFoundException(`Empleado con ID ${createVentaDto.empleado} no encontrado`);

    const sede = await this.sedeRepository.findOne({ where: { id: createVentaDto.sede } });
    if (!sede) throw new NotFoundException(`Sede con ID ${createVentaDto.sede} no encontrada`);

    const venta = this.ventaRepository.create({
      ...createVentaDto,
      cliente,
      producto,
      empleado,
      sede,
    });

    return await this.ventaRepository.save(venta);
  }

  async findAll(): Promise<Venta[]> {
    return await this.ventaRepository.find({
      relations: ['cliente', 'producto', 'empleado', 'sede'],
    });
  }

  async findOne(id: number): Promise<Venta> {
    const venta = await this.ventaRepository.findOne({
      where: { id },
      relations: ['cliente', 'producto', 'empleado', 'sede'],
    });
    if (!venta) throw new NotFoundException(`Venta con ID ${id} no encontrada`);
    return venta;
  }

  async update(id: number, updateVentaDto: UpdateVentaDto): Promise<Venta> {
    const venta = await this.findOne(id);
    Object.assign(venta, updateVentaDto);
    return await this.ventaRepository.save(venta);
  }

  async remove(id: number): Promise<void> {
    const venta = await this.findOne(id);
    await this.ventaRepository.remove(venta);
  }
}
