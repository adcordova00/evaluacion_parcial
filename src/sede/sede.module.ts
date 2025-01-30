import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sede } from './entities/sede.entity';
import { SedeService } from './sede.service';
import { SedeController } from './sede.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Sede])],
  controllers: [SedeController],
  providers: [SedeService],
  exports: [TypeOrmModule], 
})
export class SedeModule {}
