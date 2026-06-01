import {
	BadRequestException,
	Injectable,
	Logger,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateCategoryDto, UpdateCategoryDto } from './category.dto'
import { join } from 'path'
import { unlink } from 'fs/promises'

@Injectable()
export class CategoryService {
	private readonly logger = new Logger(CategoryService.name)

	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.category.findMany({
			where: { parentId: null },
			include: { children: true }
		})
	}

	private normalizeParentId(value: any): number | null | undefined {
		if (value === '' || value === 'null') return null
		if (value === undefined) return undefined
		return Number(value)
	}

	private async deleteLocalFile(imagePath: string) {
		const fullPath = join(process.cwd(), imagePath.replace(/^\//, ''))
		try {
			await unlink(fullPath)
		} catch (err) {
			this.logger.warn(`Failed to delete file: ${fullPath}`, String(err))
		}
	}

	async createCategory(dto: CreateCategoryDto, imagePath?: string | null) {
		const parentId = this.normalizeParentId(dto.parentId) ?? null
		const isSubcategory = parentId !== null

		if (isSubcategory) {
			const parentExists = await this.prisma.category.findUnique({
				where: { id: parentId }
			})

			if (!parentExists) {
				if (imagePath) await this.deleteLocalFile(imagePath)
				throw new BadRequestException(
					`Parent category with id ${parentId} does not exist`
				)
			}
		}

		if (isSubcategory && imagePath) {
			await this.deleteLocalFile(imagePath)
			imagePath = null
		}

		return this.prisma.category.create({
			data: {
				name: dto.name,
				parentId: parentId,
				imagePath: isSubcategory ? null : imagePath
			}
		})
	}

	async updateCategory(id: number, dto: UpdateCategoryDto, imagePath?: string) {
		const category = await this.prisma.category.findUnique({
			where: { id }
		})

		if (!category) {
			// Якщо категорію не знайдено, але файл надійшов - видаляємо його
			if (imagePath) await this.deleteLocalFile(imagePath)
			throw new NotFoundException('Category not found')
		}

		const parentIdInput = this.normalizeParentId(dto.parentId)

		const finalParentId =
			parentIdInput !== undefined ? parentIdInput : category.parentId
		const isSubcategory = finalParentId !== null

		if (isSubcategory && imagePath) {
			await this.deleteLocalFile(imagePath)
			imagePath = undefined // Зануляємо змінну, щоб не потрапила в БД
		}

		if (
			category.imagePath &&
			((imagePath && !isSubcategory) || isSubcategory)
		) {
			await this.deleteLocalFile(category.imagePath)
		}

		return this.prisma.category.update({
			where: { id },
			data: {
				...(dto.name !== undefined && { name: dto.name }),
				...(parentIdInput !== undefined && { parentId: parentIdInput }),

				...(isSubcategory
					? { imagePath: null }
					: imagePath !== undefined
						? { imagePath }
						: {})
			}
		})
	}
}
