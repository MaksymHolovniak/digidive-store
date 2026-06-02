import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { PaginationService } from '../pagination/pagination.service'
import { EnumProductSort, GetAllProductDto } from './dto/get-all.product.dto'
import { Prisma } from '../../generated/prisma/client'
import {
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

	async getAll(dto: GetAllProductDto = {}) {
		const { sort, searchTerm, brand } = dto

		const prismaSort: Prisma.ProductOrderByWithRelationInput[] = []

		switch (sort) {
			case EnumProductSort.Alphabetical:
				prismaSort.push({ name: 'desc' })
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

		const { perPage, skip } = this.pagination.getPagination(dto)

		const products = await this.prisma.product.findMany({
			where: {
				AND: [prismaSearchTermFilter, prismaSearchBrandFilter]
			},
			select: productGetReturnObject,
			orderBy: prismaSort,
			skip,
			take: perPage
		})

		return {
			products,
			length: await this.prisma.product.count({
				where: {
					AND: [prismaSearchTermFilter, prismaSearchBrandFilter]
				}
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
				NOT: {
					id: currentProduct.id
				}
			},
			orderBy: {
				price: 'desc'
			},
			select: productGetReturnObject,
			skip,
			take: perPage
		})

		return {
			products,
			length: await this.prisma.product.count({
				where: {
					categoryId: currentProduct.categoryId,
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

	async updateProduct(id: number, dto: UpdateProductDto, imagePath?: string | null) {
		const product = await this.byId(id)

		if (imagePath && product.imagePath) {
			await this.deleteLocalFile(product.imagePath)
		}

		return this.prisma.product.update({
			where: { id },
			data: {
				name: dto.name,
				description: dto.description,
				imagePath: imagePath || undefined,
				price: dto.price,
				stock: dto.stock,
				warrantyMonths: dto.warrantyMonths ? +dto.warrantyMonths : undefined,
				brandId: dto.brandId,
				categoryId: dto.categoryId
			}
		})
	}

	async deleteProduct(id: number) {
		const product = await this.byId(id)

		if (product.imagePath) {
			await this.deleteLocalFile(product.imagePath)
		}

		return this.prisma.product.delete({
			where: { id }
		})
	}
}
