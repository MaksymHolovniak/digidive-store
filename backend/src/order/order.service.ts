import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateOrderDto, UpdateOrderStatudDto } from './order.dto'
import { productGetReturnObject } from '../product/return-product.object'
import { userReturnObject } from '../user/return-user.object'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async createOrder(userId: number, dto: CreateOrderDto) {
		const user = await this.prisma.user.findUnique({
			where: { id: userId },
			include: {
				cart: {
					include: {
						product: true
					}
				}
			}
		})

		if (!user) throw new NotFoundException('User not found')
		if (user.cart.length === 0) throw new NotFoundException('Cart is empty')

		for (const item of user.cart) {
			if (item.product.stock < item.quantity) {
				throw new BadRequestException(
					`Only ${item.product.stock} for product "${item.product.name}" available`
				)
			}
		}

		let itemsTotal = 0

		const orderItems = user.cart.map(item => {
			const itemTotal = item.product.price.toNumber() * item.quantity
			itemsTotal += itemTotal

			return {
				productId: item.productId,
				quantity: item.quantity,
				price: item.product.price
			}
		})

		itemsTotal = Number(itemsTotal.toFixed(2))

		const DELIVERY_FEE = 5
		const FREE_DELIVERY_THRESHOLD = 150

		const deliveryFee = itemsTotal < FREE_DELIVERY_THRESHOLD ? DELIVERY_FEE : 0

		const totalPrice = Number((itemsTotal + deliveryFee).toFixed(2))
		
		return await this.prisma.$transaction(async tx => {
			for (const item of user.cart) {
				await tx.product.update({
					where: { id: item.productId },
					data: {
						stock: {
							decrement: item.quantity
						}
					}
				})
			}

			const order = await tx.order.create({
				data: {
					userId,
					country: dto.country,
					fullName: dto.fullName,
					company: dto.company,
					address: dto.address,
					postCode: dto.postCode,
					city: dto.city,
					phone: dto.phone,
					totalPrice,
					deliveryFee,
					items: {
						create: orderItems
					}
				},
				include: {
					items: true
				}
			})

			await tx.cart.deleteMany({
				where: { userId }
			})

			return order
		})
	}

	async findAll() {
		return this.prisma.order.findMany({
			include: {
				items: {
					include: {
						product: {
							select: productGetReturnObject
						}
					}
				},
				user: {
					select: userReturnObject
				}
			},
			orderBy: { createdAt: 'desc' }
		})
	}

	async findOne(id: number) {
		const order = await this.prisma.order.findUnique({
			where: { id },
			include: {
				items: {
					include: {
						product: {
							select: productGetReturnObject
						}
					}
				},
				user: {
					select: userReturnObject
				}
			}
		})

		if (!order) throw new NotFoundException('Order not found')

		return order
	}

	async updateStatus(id: number, dto: UpdateOrderStatudDto) {
		const order = await this.prisma.order.findUnique({
			where: { id }
		})

		if (!order) throw new NotFoundException('Order not found')

		return this.prisma.order.update({
			where: { id },
			data: {
				status: dto.status
			}
		})
	}
}
