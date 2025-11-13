import { IsBoolean, IsEnum, IsString, IsNumber, IsOptional } from 'class-validator';
import { LaptopCondition } from '@prisma/client';
import { Type } from 'class-transformer'; // Todo 

export class laptopDto {

  @IsString()
  brand: string

  @IsString()
  model: string

  @IsString()
  imageUrl: string

  @IsString()
  specifications: string

  @IsEnum(LaptopCondition)
  condition: LaptopCondition

  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isAssigned: boolean

  @Type(() => Boolean)
  @IsOptional()
  @IsBoolean()
  isForSale: boolean

  @Type(() => Number)
  @IsNumber()
  usageMonths: number

  @Type(() => Number)
  @IsNumber()
  price: number

}