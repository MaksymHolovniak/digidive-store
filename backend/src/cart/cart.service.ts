import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { AddToCartDto, UpdateCartDto } from './cart.dto'

@Injectable()
export class CartService {
	constructor(private prisma: PrismaService) {}

	async getUserCart(userId: number) {
		const items = await this.prisma.cart.findMany({
			where: { userId },
			include: {
				product: {
					select: {
						name: true,
						imagePath: true,
						price: true,
						stock: true,
						warrantyMonths: true,
						brand: {
							select: {
								name: true
							}
						}
					}
				}
			},
			orderBy: {
				product: {
					name: 'asc'
				}
			}
		})

		let itemsTotal = 0
		items.forEach(item => {
			itemsTotal += item.product.price.toNumber() * item.quantity
		})

		itemsTotal = Number(itemsTotal.toFixed(1))

		const DELIVERY_FEE = 5
		const FREE_DELIVERY_THRESHOLD = 150

		const deliveryFee =
			items.length > 0 && itemsTotal < FREE_DELIVERY_THRESHOLD
				? DELIVERY_FEE
				: 0

		const totalPrice = Number((itemsTotal + deliveryFee).toFixed(1))

		return {
			items,
			itemsTotal,
			deliveryFee,
			totalPrice
		}
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
		} else {
			await this.prisma.cart.create({
				data: { userId, productId, quantity }
			})
		}

		return this.getUserCart(userId)
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

		await this.prisma.cart.update({
			where: {
				userId_productId: { userId, productId }
			},
			data: {
				quantity: dto.quantity
			}
		})

		return this.getUserCart(userId)
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
