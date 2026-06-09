import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { UserDto } from './user.dto'
import { hash } from 'argon2'
import { userReturnObject } from './return-user.object'

@Injectable()
export class UserService {
	constructor(private prisma: PrismaService) {}

	async byId(id: number) {
		const user = await this.prisma.user.findUnique({
			where: { id },
			select: {
				...userReturnObject,
				favorites: {
					select: {
						product: {
							select: {
								id: true,
								name: true,
								imagePath: true,
								price: true,
								stock: true,
								brand: {
									select: {
										name: true
									}
								}
							}
						}
					}
				}
			}
		})

		if (!user) throw new NotFoundException('User not found')

		return user
	}

	async updateProfile(id: number, dto: UserDto) {
		const isSameUser = await this.prisma.user.findUnique({
			where: {
				email: dto.email
			}
		})

		if (isSameUser && id !== isSameUser.id)
			throw new BadRequestException('Email already in use')

		const user = await this.prisma.user.findUnique({
			where: { id }
		})

		if (!user) throw new NotFoundException('User not found')

		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				email: dto.email,
				password: dto.password ? await hash(dto.password) : user.password
			}
		})
	}

	async toggleFavorite(productId: number, userId: number) {
		const user = await this.byId(userId)

		if (!user) throw new NotFoundException('User not found')

		const favorite = await this.prisma.favorite.findFirst({
			where: {
				userId,
				productId
			}
		})

		if (favorite) {
			await this.prisma.favorite.delete({
				where: {
					id: favorite.id
				}
			})
		} else {
			await this.prisma.favorite.create({
				data: {
					userId,
					productId
				}
			})
		}

		return {
			message: 'Success',
			statusCode: 1
		}
	}
}
