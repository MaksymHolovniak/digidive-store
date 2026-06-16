import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateOrderDto, UpdateOrderStatudDto } from './order.dto'
import { productGetReturnObject, productOrderReturnObject } from '../product/return-product.object'
import { userReturnObject } from '../user/return-user.object'
import Stripe from 'stripe'

@Injectable()
export class OrderService {
	private stripe: InstanceType<typeof Stripe>

	constructor(private prisma: PrismaService) {
		const stripeSecretKey = process.env.STRIPE_SECRET_KEY

		if (!stripeSecretKey) {
			throw new Error(
				'STRIPE_SECRET_KEY is not defined in environment variables'
			)
		}

		this.stripe = new Stripe(stripeSecretKey)
	}

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

		await this.prisma.order.deleteMany({
			where: {
				userId,
				status: 'PENDING'
			}
		})

		const order = await this.prisma.order.create({
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
				status: 'PENDING',
				items: { create: orderItems }
			}
		})

		const lineItems = user.cart.map(item => ({
			price_data: {
				currency: 'usd',
				product_data: {
					name: item.product.name
				},
				unit_amount: Math.round(item.product.price.toNumber() * 100)
			},
			quantity: item.quantity
		}))

		if (deliveryFee > 0) {
			lineItems.push({
				price_data: {
					currency: 'usd',
					product_data: { name: 'Delivery Fee' },
					unit_amount: deliveryFee * 100
				},
				quantity: 1
			})
		}

		const session = await this.stripe.checkout.sessions.create({
			payment_method_types: ['card'],
			line_items: lineItems,
			mode: 'payment',
			success_url: `${process.env.CLIENT_URL}/payment/success?orderId=${order.id}`,
			cancel_url: `${process.env.CLIENT_URL}/checkout`,
			metadata: { orderId: order.id.toString(), userId: userId.toString() }
		})

		return { url: session.url }
	}

	async confirmOrder(orderId: number, userId: number) {
		const order = await this.prisma.order.findUnique({
			where: { id: orderId },
			include: { items: { include: { product: true } } }
		})

		if (!order) throw new NotFoundException('Order not found')
		if (order.status === 'PAID') return order

		return await this.prisma.$transaction(async tx => {
			for (const item of order.items) {
				if (item.product.stock < item.quantity) {
					throw new BadRequestException(
						`Product ${item.product.name} is out of stock`
					)
				}

				await tx.product.update({
					where: { id: item.productId },
					data: { stock: { decrement: item.quantity } }
				})
			}

			await tx.cart.deleteMany({
				where: { userId }
			})

			return await tx.order.update({
				where: { id: orderId },
				data: { status: 'PAID' },
				include: { items: true }
			})
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

	async findUserOrders(userId: number) {
		return this.prisma.order.findMany({
			where: {
				userId,
				NOT: {
					status: 'PENDING'
				}
			},
			include: {
				items: {
					include: {
						product: {
							select: productOrderReturnObject
						}
					}
				}
			}
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
