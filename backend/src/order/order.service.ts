import { Injectable, NotFoundException } from '@nestjs/common'
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

		let totalPrice = 0

		const orderItems = user.cart.map(item => {
			const itemTotal = item.product.price.toNumber() * item.quantity
			totalPrice += itemTotal

			return {
				productId: item.productId,
				quantity: item.quantity,
				price: item.product.price
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
				items: {
					create: orderItems
				}
			},
			include: {
				items: true
			}
		})

		await this.prisma.cart.deleteMany({
			where: {
				userId
			}
		})

		return order
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
