import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { CartService } from './cart.service'
import { Auth } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { AddToCartDto, UpdateCartDto } from './cart.dto'

@Controller('cart')
export class CartController {
	constructor(private readonly cartService: CartService) {}

	@Auth()
	@Get()
	getCart(@CurrentUser('id') id: number) {
		return this.cartService.getUserCart(id)
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(201)
	@Auth()
	@Post()
	addToCart(@CurrentUser('id') id: number, @Body() dto: AddToCartDto) {
		return this.cartService.addToCart(id, dto)
	}

	@UsePipes(new ValidationPipe())
	@Auth()
	@Patch('/:productId')
	updateQuantity(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string,
		@Body() dto: UpdateCartDto
	) {
		return this.cartService.updateQuantity(id, +productId, dto)
	}

	@Auth()
	@Delete('/all')
	clearCart(@CurrentUser('id') id: number) {
		return this.cartService.clearCart(id)
	}

	@Auth()
	@Delete('/:productId')
	removeFromCart(
		@CurrentUser('id') id: number,
		@Param('productId') productId: string
	) {
		return this.cartService.removeFromCart(id, +productId)
	}
}
