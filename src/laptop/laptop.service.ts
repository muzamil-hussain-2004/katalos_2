import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { laptopDto } from './dto/laptop_dto';
import { DbService } from 'src/db/db.service';
import { butLaptop } from './dto/buyLaptop_dto';
import { putLaptopForsaleDto } from './dto/putLaptopForSale_dto';

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
  // check laptop and user first outside transaction => no lock hold 

  const laptop = await this.dbService.laptop.findUnique({
    where: { id: laptopId }
  });
  if (!laptop) throw new NotFoundException('Laptop not found');
  if(laptop.isAssigned) throw new BadRequestException('Laptop is already assigned');
 
  const user = await this.dbService.user.findUnique({
    where: { id: userId }
  });
  if (!user) throw new NotFoundException('user not found');
  if (user.assignedLaptopId) throw new BadRequestException('user already has a laptop assigned');
  
  // transaction to assign laptop 
  const [updatedLaptop] = await this.dbService.$transaction([
    this.dbService.laptop.update({
      where: {id: laptopId },
      data: {
        isAssigned: true,
        assignedTo: { connect: { id: userId } }
      }
    }),
    this.dbService.user.update({
      where: { id: userId },
      data: { assignedLaptopId: laptopId }
    })
  ]);

  return {
    message: 'Laptop assigned successfully',
    data: updatedLaptop,
  };

}

async getAllLaptops() {
  const laptops = await this.dbService.laptop.findMany({
    include: {
      assignedTo: true,
    }
  })

  return laptops;
}

async laptopsForSale() {
  const laptops = await this.dbService.laptop.findMany({
    where: {
      isForSale: true,
    },
    include: {
      assignedTo: true,
    }
  })
  return laptops;
}

async notAssignedLaptops() {
  const laptops = await this.dbService.laptop.findMany({
    where: {
      isAssigned: false
    }
  });
  return laptops;
}

// todo ... i wll implement this featurs later

async putLaptopForSale(data: putLaptopForsaleDto) {
  const laptop = await this.dbService.laptop.findUnique({
    where: { id: data.laptopId }
  });
  if(!laptop) throw new NotFoundException('Laptop not found');

  const updatedLaptop = await this.dbService.laptop.update({
    where: { id: data.laptopId },
    data: {
      isForSale: data.isForSale
    }
  });
  return updatedLaptop;
}

}
