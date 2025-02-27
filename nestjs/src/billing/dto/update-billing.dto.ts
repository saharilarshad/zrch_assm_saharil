import { PartialType } from '@nestjs/mapped-types';
import { IsDecimal, IsInt, IsString } from 'class-validator';

export class UpdateBillingDto {
  // @IsString()
  // email: string;

  // @IsString()
  // first_name: string;

  // @IsString()
  // last_name: string;

  // @IsString()
  // photo: string;

  @IsInt()
  billingId: number;

  @IsString()
  location: string;

  @IsDecimal()
  premiumPaid: string;
}
