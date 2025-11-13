import { Injectable } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { laptopDto } from './dto/laptop_dto';
import { DbService } from 'src/db/db.service';

@Injectable()
export class LaptopService {
constructor(
  private cloudinaryService: CloudinaryService,
  private dbService: DbService   
) {}

async addLaptop(data: laptopDto , file?: Express.Multer.File) {
 let imageUrl = '';

 if (file) {
  const uploadImage = await this.cloudinaryService.uploadImage(file, 'laptops');
  imageUrl = uploadImage.secure_url;
 }
 const addlaptop = await this.dbService.laptop.create({
  data: {
    model: data.model,
    brand: data.brand,
    isAssigned: data.isAssigned,
    isForSale: data.isForSale,
    specifications: data.specifications,
    condition: data.condition,
    usageMonths: data.usageMonths,
    price:data.price,
    imageUrl
  },
 });

 return addlaptop;

}

}
