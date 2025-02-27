
import { IsDecimal, IsInt, IsString } from "class-validator";

export class CreateBillingDto {
    // @IsString()
    // email:string;

    // @IsString()
    // first_name:string;

    // @IsString()
    // last_name:string;

    // @IsString()
    // photo:string;

    @IsInt()
    productCode:number;

    @IsString()
    location:string;

    @IsDecimal()
    premiumPaid:string;

}