import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  Put,
} from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateBillingDto } from './dto/create-billing.dto';
import { UpdateBillingDto } from './dto/update-billing.dto';
import { ApiKeyGuard } from '../guards/api-key-guards';
import { ApiHeader, ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('billing')
@Controller('billing')
export class BillingController {
  constructor(private readonly billingService: BillingService) {}

  @UseGuards(ApiKeyGuard)
  @Post()
  @ApiOperation({ summary: 'Create a billing' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API Key for authorization',
    required: true, 
  })
  @ApiResponse({
    status: 201,
    description: 'Successfully created the a list of billing.',
  })
  @ApiResponse({
    status: 404,
    description: 'Invalid input data.',
  })
  create(@Body() input: CreateBillingDto) {
    return this.billingService.create(input);
  }

  @Get()
  @ApiOperation({ summary: 'Get all billing' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the list of billing.',
  })
  @ApiResponse({
    status: 404,
    description: 'No billing found.',
  })
  @ApiQuery({
    name: 'productCode',  
    required: false,      
    description: 'Filter billing by product code',  
    type: Number,         
  })
  @ApiQuery({
    name: 'location',     
    required: false,      
    description: 'Filter billing by location', 
    type: String,         
  })
  findAll(
    @Query('productCode') productCode?: number,
    @Query('location') location?: string,
  ) {
    return this.billingService.findAll(productCode, location);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a billing by ID' })
  @ApiResponse({
    status: 200,
    description: 'Successfully retrieved the billing.',
  })
  @ApiResponse({
    status: 404,
    description: 'Billing not found.',
  })
  findOne(@Param('id') id: string) {
    return this.billingService.findOne(+id);
  }

  // @UseGuards(ApiKeyGuard)
  // @Put(':id')
  // update(@Param('id') id: string, @Body() updateBillingDto: UpdateBillingDto) {
  //   return this.billingService.update(+id, updateBillingDto);
  // }

  @UseGuards(ApiKeyGuard)
  @Put()
  @ApiOperation({ summary: 'Update a billing' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API Key for authorization',
    required: true, 
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully update a billing.',
  })
  @ApiResponse({
    status: 404,
    description: 'No billing found.',
  })
  update(
    @Query('productCode') productCode: number,
    @Body() updateBillingDto: UpdateBillingDto,
  ) {
    // console.log("productCode",productCode)
    // console.log("updateBillingDto",updateBillingDto)
    return this.billingService.update(+productCode, updateBillingDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.billingService.remove(+id);
  // }

  @UseGuards(ApiKeyGuard)
  @Delete()
  @ApiOperation({ summary: 'Delete a billing' })
  @ApiHeader({
    name: 'X-API-KEY',
    description: 'API Key for authorization',
    required: true, 
  })
  @ApiResponse({
    status: 200,
    description: 'Successfully deleted a billing.',
  })
  @ApiResponse({
    status: 404,
    description: 'No billing found.',
  })
  remove(@Query('productCode') productCode: number) {
    // console.log("productCode",productCode)
    return this.billingService.remove(+productCode);
  }
}

