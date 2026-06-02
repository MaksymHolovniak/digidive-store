import { IsEnum, IsOptional, IsString } from 'class-validator'
import { OrderStatus } from '../../generated/prisma/enums'

export class CreateOrderDto {
	@IsString()
	country: string

	@IsString()
	fullName: string

	@IsOptional()
	@IsString()
	company?: string

	@IsString()
	city: string

	@IsString()
	address: string

	@IsString()
	postCode: string

	@IsString()
	phone: string
}

export class UpdateOrderStatudDto {
	@IsEnum(OrderStatus, {
		message:
			'Status must be a valid OrderStatus value (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)'
	})
	status: OrderStatus
}
