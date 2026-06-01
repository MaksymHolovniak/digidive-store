import {
	Body,
	Controller,
	Get,
	Param,
	Patch,
	Post,
	UploadedFile,
	UseInterceptors,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CategoryService } from './category.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'
import { extname, join } from 'path'

@Controller('category')
export class CategoryController {
	constructor(private readonly categoryService: CategoryService) {}

	@Get()
	async getAll() {
		return this.categoryService.getAll()
	}

	@Auth()
	@Post()
	@UsePipes(new ValidationPipe())
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(process.cwd(), 'uploads/categories'),
				filename: (req, file, cb) => {
					const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9)

					cb(null, uniqueName + extname(file.originalname))
				}
			})
		})
	)
	async createCategory(
		@Body() dto: CreateCategoryDto,
		@UploadedFile() file: Express.Multer.File
	) {
		const imagePath = file ? `/uploads/categories/${file.filename}` : null
		return this.categoryService.createCategory(dto, imagePath)
	}

	@Auth()
	@Patch(':id')
	@UseInterceptors(
		FileInterceptor('image', {
			storage: diskStorage({
				destination: join(process.cwd(), 'uploads/categories'),
				filename: (req, file, cb) => {
					const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9)
					cb(null, uniqueName + extname(file.originalname))
				}
			})
		})
	)
	async updateCategory(
		@Param('id') id: string,
		@Body() dto: UpdateCategoryDto,
		@UploadedFile() file?: Express.Multer.File
	) {
		const imagePath = file ? `/uploads/categories/${file.filename}` : undefined

		return this.categoryService.updateCategory(+id, dto, imagePath)
	}
}
