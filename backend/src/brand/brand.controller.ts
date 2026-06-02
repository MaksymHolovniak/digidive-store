import { Body, Controller, Get, HttpCode, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { BrandDto } from './brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }
  
  @Get()
  async getAll() {
    return this.brandService.getAll()
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Auth('admin')
  @Post()
  async createBrand(@Body() dto: BrandDto) {
    return this.brandService.createBrand(dto)
  }
}
