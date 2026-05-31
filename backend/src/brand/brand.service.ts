import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { BrandDto } from './brand.dto'

@Injectable()
export class BrandService {
    constructor(private prisma: PrismaService) { }
    
    async getAll() {
        return this.prisma.brand.findMany()
    }

	async createBrand(dto: BrandDto) {
		return this.prisma.brand.create({
			data: {
				name: dto.name
			}
		})
	}
}
