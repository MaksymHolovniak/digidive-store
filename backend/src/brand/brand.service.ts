import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { BrandDto } from './brand.dto'

@Injectable()
export class BrandService {
	constructor(private prisma: PrismaService) {}

	async getAll() {
		return this.prisma.brand.findMany({
			orderBy: {
				name: 'asc'
			}
		})
	}

	async createBrand(dto: BrandDto) {
		return this.prisma.brand.create({
			data: {
				name: dto.name
			}
		})
	}

	async updateBrand(id: number, dto: BrandDto) {
		const brand = await this.prisma.brand.findUnique({ where: { id } })

		if (!brand) throw new NotFoundException('Brand not found')

		return this.prisma.brand.update({
			where: { id },
			data: { name: dto.name }
		})
	}

	async deleteBrand(id: number) {
		const brand = await this.prisma.brand.findUnique({ where: { id } })
		if (!brand) throw new NotFoundException('Brand not found')

		return this.prisma.brand.delete({ where: { id } })
	}
}
