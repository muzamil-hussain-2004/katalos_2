import { 
  Body,
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth-guard';
import { LaptopService } from './laptop.service';
import { laptopDto } from './dto/laptop_dto';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('laptop')
export class LaptopController {
  constructor(private laptopService: LaptopService) {}

 @UseGuards(JwtAuthGuard)
 @Post('add')
 @UseInterceptors(FileInterceptor('file'))
 async addLaptop(
  @Body() createLaptopDto: laptopDto,
  @UploadedFile() file: Express.Multer.File,
   ) {
   const laptop = await this.laptopService.addLaptop(createLaptopDto, file); 
   return {
    message: 'Laptop added successfully',
    data: laptop,
   };
 }

}
