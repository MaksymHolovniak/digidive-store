import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import {
	EnumProductSort,
	GetAdminProductsDto,
	GetAllProductDto
} from './dto/get-all.product.dto'
import { Prisma } from '../../generated/prisma/client'
import {
	productAdminReturnObject,
	productGetReturnObject,
	productReturnObject
} from './return-product.object'
import { PaginationDto } from '../pagination/pagination.dto'
import { join } from 'path'
import { unlink } from 'fs/promises'
import { CreateProductDto, UpdateProductDto } from './dto/product.dto'

@Injectable()
export class ProductService {
	private readonly logger = new Logger(ProductService.name)

	constructor(
		private prisma: PrismaService,
		private pagination: PaginationService
	) {}

	private async deleteLocalFile(imagePath: string) {
		const fullPath = join(process.cwd(), imagePath.replace(/^\//, ''))
		try {
			await unlink(fullPath)
		} catch (err) {
			this.logger.warn(`Failed to delete file: ${fullPath}`, String(err))
		}
	}

	async getAdminAll(dto: GetAdminProductsDto = {}) {
		const { sort, searchTerm, showArchived } = dto
		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		switch (sort) {
			case EnumProductSort.Alphabetical:
				prismaSort.push({ name: 'asc' })
				break
			case EnumProductSort.EXPENSIVE:
				prismaSort.push({ price: 'desc' })
				break
			case EnumProductSort.CHEAPER:
				prismaSort.push({ price: 'asc' })
				break
			default:
				prismaSort.push({ id: 'desc' })
				break
		}

		prismaSort.push({ stock: 'desc' })

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{ name: { contains: searchTerm } },
						{ brand: { name: { contains: searchTerm } } },
						{ category: { name: { contains: searchTerm } } }
					]
				}
			: {}

		const prismaArchiveFilter: Prisma.ProductWhereInput =
			showArchived === 'true' ? { isActive: false } : { isActive: true }

		const whereFilters: Prisma.ProductWhereInput = {
			AND: [prismaSearchTermFilter, prismaArchiveFilter]
		}

		const { perPage, skip } = this.pagination.getPagination(dto)

		const products = await this.prisma.product.findMany({
			where: whereFilters,
			select: productAdminReturnObject,
			orderBy: prismaSort,
			skip,
			take: perPage
		})

		return {
			products,
			length: await this.prisma.product.count({
				where: whereFilters
			})
		}
	}

	async getAll(categoryId: number | undefined, dto: GetAllProductDto = {}) {
		const { sort, searchTerm, brand, minPrice, maxPrice } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		switch (sort) {
			case EnumProductSort.Alphabetical:
				prismaSort.push({ name: 'asc' })
				break
			case EnumProductSort.EXPENSIVE:
				prismaSort.push({ price: 'desc' })
				break
			case EnumProductSort.CHEAPER:
				prismaSort.push({ price: 'asc' })
				break
			default:
				prismaSort.push({ id: 'desc' })
				break
		}

		prismaSort.push({ stock: 'desc' })

		let prismaCategoryFilter: Prisma.ProductWhereInput = {}

		if (categoryId) {
			const category = await this.prisma.category.findUnique({
				where: { id: categoryId },
				include: { children: true }
			})

			if (category) {
				const categoryIds = [
					category.id,
					...category.children.map(child => child.id)
				]

				prismaCategoryFilter = {
					categoryId: {
						in: categoryIds
					}
				}
			}
		}

		const prismaSearchTermFilter: Prisma.ProductWhereInput = searchTerm
			? {
					OR: [
						{
							name: {
								contains: searchTerm
							}
						},
						{
							brand: {
								name: {
									contains: searchTerm
								}
							}
						},
						{
							category: {
								name: {
									contains: searchTerm
								}
							}
						}
					]
				}
			: {}

		const prismaSearchBrandFilter: Prisma.ProductWhereInput = brand
			? {
					brand: {
						name: {
							contains: brand
						}
					}
				}
			: {}

		const prismaPriceFilter: Prisma.ProductWhereInput = {}

		if (minPrice !== undefined || maxPrice !== undefined) {
			prismaPriceFilter.price = {
				...(minPrice !== undefined ? { gte: minPrice } : {}),
				...(maxPrice !== undefined ? { lte: maxPrice } : {})
			}
		}

		const { perPage, skip } = this.pagination.getPagination(dto)

		const whereFilters: Prisma.ProductWhereInput = {
			AND: [
				{ isActive: true },
				prismaSearchTermFilter,
				prismaSearchBrandFilter,
				prismaCategoryFilter,
				prismaPriceFilter
			]
		}

		const products = await this.prisma.product.findMany({
			where: whereFilters,
			select: productGetReturnObject,
			orderBy: prismaSort,
			skip,
			take: perPage
		})

		return {
			products,
			length: await this.prisma.product.count({
				where: whereFilters
			})
		}
	}

	async byId(id: number) {
		const product = await this.prisma.product.findUnique({
			where: { id },
			select: productReturnObject
		})

		if (!product) throw new NotFoundException('Product not found')

		return product
	}

	async getSimilar(id: number, dto: PaginationDto) {
		const { perPage, skip } = this.pagination.getPagination(dto)

		const currentProduct = await this.byId(id)

		if (!currentProduct)
			throw new NotFoundException('Current Product not found')

		const products = await this.prisma.product.findMany({
			where: {
				categoryId: currentProduct.categoryId,
				isActive: true,
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: [{ stock: 'desc' }, { price: 'desc' }],
			select: productGetReturnObject,
			skip,
			take: perPage
		})

		return {
			products,
			length: await this.prisma.product.count({
				where: {
					categoryId: currentProduct.categoryId,
					isActive: true,
					NOT: {
						id: currentProduct.id
					}
				}
			})
		}
	}

	async createProduct(dto: CreateProductDto, imagePath?: string | null) {
		const product = await this.prisma.product.create({
			data: {
				name: dto.name,
				description: dto.description,
				imagePath: imagePath || '',
				price: dto.price,
				stock: dto.stock,
				warrantyMonths: dto.warrantyMonths ? +dto.warrantyMonths : 0,
				brandId: dto.brandId,
				categoryId: dto.categoryId
			},
			select: productReturnObject
		})

		return product
	}

	async updateProduct(
		id: number,
		dto: UpdateProductDto,
		imagePath?: string | null
	) {
		const product = await this.byId(id)

		if (imagePath && product.imagePath) {
			await this.deleteLocalFile(product.imagePath)
		}

		return this.prisma.product.update({
			where: { id },
			data: {
				name: dto.name,
				description: dto.description,
				imagePath: imagePath !== undefined ? imagePath || '' : undefined,
				price: dto.price,
				stock: dto.stock,
				warrantyMonths: dto.warrantyMonths ? +dto.warrantyMonths : undefined,
				brandId: dto.brandId,
				categoryId: dto.categoryId
			}
		})
	}

	async toggleProductArchive(id: number) {
		const product = await this.prisma.product.findUnique({
			where: { id }
		})

		if (!product) throw new NotFoundException('Product not found')

		return this.prisma.product.update({
			where: { id },
			data: {
				isActive: !product.isActive
			},
			select: productAdminReturnObject
		})
	}
}
