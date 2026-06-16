import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

export interface ISalesPoint {
	day: string
	revenue: number
}

@Injectable()
export class StatisticsService {
	constructor(private prisma: PrismaService) {}

	async getMainStatistics() {
		const [usersCount, productsCount, orders] = await Promise.all([
			this.prisma.user.count(),
			this.prisma.product.count(),
			this.prisma.order.findMany({
				where: { NOT: { status: 'PENDING' } }
			})
		])

		const totalRevenue = orders
			.filter(
				o =>
					o.status === 'PAID' ||
					o.status === 'DELIVERED' ||
					o.status === 'SHIPPED' ||
					o.status === 'PROCESSING'
			)
			.reduce((acc, order) => acc + order.totalPrice.toNumber(), 0)

		const statusMap: Record<string, number> = {}
		orders.forEach(o => {
			statusMap[o.status] = (statusMap[o.status] || 0) + 1
		})
		const ordersDistribution = Object.entries(statusMap).map(
			([status, count]) => ({
				name: status,
				value: count
			})
		)

		const salesData: ISalesPoint[] = []
		for (let i = 6; i >= 0; i--) {
			const date = new Date()
			date.setDate(date.getDate() - i)
			const dateString = date.toLocaleDateString('en-US', {
				month: 'short',
				day: 'numeric'
			})

			const dayOrders = orders.filter(o => {
				const orderDate = new Date(o.createdAt)
				return (
					orderDate.toDateString() === date.toDateString() &&
					(o.status === 'PAID' ||
						o.status === 'DELIVERED' ||
						o.status === 'SHIPPED' ||
						o.status === 'PROCESSING')
				)
			})

			const dayRevenue = dayOrders.reduce(
				(acc, order) => acc + order.totalPrice.toNumber(),
				0
			)

			salesData.push({
				day: dateString,
				revenue: Number(dayRevenue.toFixed(2))
			})
		}

		return {
			mainMetrics: [
				{ title: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}` },
				{ title: 'Orders Placed', value: orders.length },
				{ title: 'Active Products', value: productsCount },
				{ title: 'Registered Users', value: usersCount }
			],
			salesData,
			ordersDistribution
		}
	}
}
