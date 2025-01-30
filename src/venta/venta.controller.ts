import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { VentaService } from './venta.service';
import { CreateVentaDto } from './dto/create-venta.dto';
import { UpdateVentaDto } from './dto/update-venta.dto';

@Controller('venta')
export class VentaController {
  constructor(private readonly ventaService: VentaService) {}

  //Endpoint Consultas avanzadas
  @Get('/estadisticas/ventas-por-mes')
  totalVentasPorMes() {
    return this.ventaService.totalVentasPorMes();
  }

  @Get('/estadisticas/ventas-por-sede')
  totalVentasPorSede() {
    return this.ventaService.totalVentasPorSede();
  }

  @Get('/estadisticas/productos-mas-vendidos')
  productosMasVendidos() {
    return this.ventaService.productosMasVendidos();
  }

  @Get('/estadisticas/mejor-vendedor')
  mejorVendedor() {
    return this.ventaService.mejorVendedor();
  }

  @Get('/estadisticas/clientes-top')
  clientesTop() {
    return this.ventaService.clientesTop();
  }

  //Endpoints CRUD
  @Post()
  create(@Body() createVentaDto: CreateVentaDto) {
    return this.ventaService.create(createVentaDto);
  }

  @Get()
  findAll() {
    return this.ventaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.ventaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateVentaDto: UpdateVentaDto) {
    return this.ventaService.update(+id, updateVentaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.ventaService.remove(+id);
  }
}
