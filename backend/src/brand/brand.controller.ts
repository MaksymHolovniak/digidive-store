import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { BrandService } from './brand.service';
import { Auth } from '../auth/decorators/auth.decorator';
import { BrandDto } from './brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) { }
  
  @Get()
  async getAll(@Query('categoryId') categoryId: string) {
    const parsedId = categoryId && !isNaN(+categoryId) ? +categoryId : undefined
    return this.brandService.getAll(parsedId)
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(201)
  @Auth('admin')
  @Post()
  async createBrand(@Body() dto: BrandDto) {
    return this.brandService.createBrand(dto)
  }

  @UsePipes(new ValidationPipe())
  @Auth('admin')
  @Patch(':id')
  async updateBrand(@Param('id') id: string, @Body() dto: BrandDto) {
    return this.brandService.updateBrand(+id, dto)
  }

  @Auth('admin')
  @Delete(':id')
  async deleteBrand(@Param('id') id: string) {
    return this.brandService.deleteBrand(+id)
  }
}
