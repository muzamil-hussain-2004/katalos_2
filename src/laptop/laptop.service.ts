import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
    usageMonths: data.usageMonths ?? 0,
    price:data.price,
    imageUrl
  },
 });

 return addlaptop;

}

async assignLaptop(userId: number, laptopId: number) {
  return this.dbService.$transaction( async (tx) => {
    // check laptop availability
    const laptop = await tx.laptop.findUnique({ where: { id: laptopId } });
    if (!laptop) throw new NotFoundException('Laptop not found');

    if (laptop.isAssigned) 
    throw new BadRequestException('Laptop is already assigned');

     // check user exist and not assigned laptop
     const user = await tx.user.findUnique({ where: { id: userId } });
     if (!user) throw new NotFoundException('User not found');

     if(user.assignedLaptopId)
     throw new BadRequestException('User already has an assigned Laptop');

    const updatedLaptop = await tx.laptop.update({
      where: { id: laptopId },
      data: {
        isAssigned: true,
        assignedTo: {
          connect: {id: userId}
        },
      },
    });

    await tx.user.update({
      where: { id: userId },
      data: {
        assignedLaptopId: laptopId
      },
    });

    return { message: 'Laptop assigned successfully', data: updatedLaptop };

  });
}

}
