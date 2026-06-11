import {
	Body,
	Controller,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { OrderService } from './order.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { CreateOrderDto, UpdateOrderStatudDto } from './order.dto'

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@UsePipes(new ValidationPipe({ transform: true }))
	@HttpCode(201)
	@Auth()
	@Post()
	createOrder(@CurrentUser('id') id: number, @Body() dto: CreateOrderDto) {
		return this.orderService.createOrder(id, dto)
	}

	@Auth('admin')
	@Get()
	findAll() {
		return this.orderService.findAll()
	}

	@Auth()
	@Get('my')
	findUserOrders(@CurrentUser('id') id: number) {
		return this.orderService.findUserOrders(id)
	}

	@Auth()
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.orderService.findOne(+id)
	}

	@UsePipes(new ValidationPipe())
	@Auth('admin')
	@Patch(':id/status')
	updateStatus(@Param('id') id: string, @Body() dto: UpdateOrderStatudDto) {
		return this.orderService.updateStatus(+id, dto)
	}
}
