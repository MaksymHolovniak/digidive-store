import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	Query,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { ProductService } from './product.service'
import { GetAllProductDto } from './dto/get-all.product.dto'
import { PaginationDto } from '../pagination/pagination.dto'
import { Auth } from '../auth/decorators/auth.decorator'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@UsePipes(new ValidationPipe())
	@Get(':categoryId')
	async getAll(@Param('categoryId') categoryId: string,  @Query() queryDto: GetAllProductDto) {
		return this.productService.getAll(+categoryId, queryDto)
	}

	@Get(':id')
	async getProduct(@Param('id') id: string) {
		return this.productService.byId(+id)
	}

	@Get('similar/:id')
	async getSimilar(@Param('id') id: string, @Query() queryDto: PaginationDto) {
		return this.productService.getSimilar(+id, queryDto)
	}

	@UsePipes(new ValidationPipe({ transform: true }))
	@HttpCode(201)
	@Auth('admin')
	@Post()
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(process.cwd(), 'uploads/products'),
				filename: (req, file, cb) => {
					const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9)
					cb(null, uniqueName + extname(file.originalname))
				}
			})
		})
	)
	async createProduct(
		@Body() dto: CreateProductDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		const imagePath = file ? `/uploads/products/${file.filename}` : undefined
		return this.productService.createProduct(dto, imagePath)
	}

	@UsePipes(new ValidationPipe({ transform: true }))
	@Auth('admin')
	@Patch(':id')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(process.cwd(), 'uploads/products'),
				filename: (req, file, cb) => {
					const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9)
					cb(null, uniqueName + extname(file.originalname))
				}
			})
		})
	)
	async updateProduct(
		@Param('id') id: string,
		@Body() dto: UpdateProductDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		const imagePath = file ? `/uploads/products/${file.filename}` : undefined
		return this.productService.updateProduct(+id, dto, imagePath)
	}

	@Auth('admin')
	@Delete(':id')
	async deleteProduct(@Param('id') id: string) {
		return this.productService.deleteProduct(+id)
	}
}
