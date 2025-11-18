import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class putLaptopForsaleDto {

  @IsInt()
  laptopId: number;

  
  // @IsNumber()
  // salePrice: number; // removed beacuse user just can request not i will implement that later .
  
  // @IsNumber()
  // listedBy: number

  @IsBoolean()
  isForSale: boolean

}