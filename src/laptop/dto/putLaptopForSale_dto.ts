import { IsBoolean, IsInt, IsNumber, IsString } from 'class-validator';

export class putLaptopForsaleDto {

  @IsInt()
  laptopId: number;

  
  @IsNumber()
  salePrice: number;
  
  @IsString()
  listedBy: string

  @IsBoolean()
  isForSale: boolean

}