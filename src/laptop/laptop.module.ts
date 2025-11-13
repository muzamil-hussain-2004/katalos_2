import { Module } from '@nestjs/common';
import { LaptopService } from './laptop.service';
import { LaptopController } from './laptop.controller';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { DbService } from 'src/db/db.service';

@Module({
  providers: [LaptopService, DbService],
  imports: [CloudinaryModule],
  controllers: [LaptopController]
})
export class LaptopModule {}
