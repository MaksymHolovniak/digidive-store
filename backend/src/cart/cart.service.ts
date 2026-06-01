import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AddToCartDto, UpdateCartDto } from './cart.dto'

@Injectable()
export class CartService {
	constructor(private prisma: PrismaService) {}

	getUserCart(userId: number) {
		return this.prisma.cart.findMany({
			where: { userId },
			include: {
				product: {
                    select: {
                        name: true,
                        imagePath: true,
                        price: true,
                        stock: true
                  }  
				}
			},
			orderBy: {
				product: {
					name: 'asc'
				}
			}
		})
	}

	async addToCart(userId: number, dto: AddToCartDto) {
		const { productId, quantity } = dto

		const product = await this.prisma.product.findUnique({
			where: { id: productId }
		})

		if (!product) throw new NotFoundException('Product not found')

		const existing = await this.prisma.cart.findUnique({
			where: {
				userId_productId: { userId, productId }
			}
		})

		if (existing) {
			return this.prisma.cart.update({
				where: {
					userId_productId: { userId, productId }
				},
				data: {
					quantity: { increment: quantity }
				}
			})
		}

		return this.prisma.cart.create({
			data: {
				userId,
				productId,
				quantity
			}
		})
	}

	async updateQuantity(userId: number, productId: number, dto: UpdateCartDto) {
		const existing = await this.prisma.cart.findUnique({
			where: {
				userId_productId: { userId, productId }
			}
		})

		if (!existing) {
			throw new NotFoundException('Cart item not found')
		}

		return this.prisma.cart.update({
			where: {
				userId_productId: { userId, productId }
			},
			data: {
				quantity: dto.quantity
			}
		})
	}

	async removeFromCart(userId: number, productId: number) {
		return this.prisma.cart.delete({
			where: {
				userId_productId: { userId, productId }
			}
		})
	}

	async clearCart(userId: number) {
		return this.prisma.cart.deleteMany({
			where: { userId }
		})
	}
}
