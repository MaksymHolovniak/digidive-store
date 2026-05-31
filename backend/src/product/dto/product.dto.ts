import { IsDecimal, IsInt, IsString, MaxLength, Min, MinLength } from "class-validator";
import { Prisma } from "../../../generated/prisma/client";
import { Decimal } from "@prisma/client/runtime/index-browser";

export class ProductDto implements Prisma.ProductUpdateInput {
	@IsString()
	name: string

	@IsString()
	imagePath: string

	@IsString()
	@MinLength(70)
	@MaxLength(100)
	description: string

	@MinLength(0)
	@IsDecimal()
	price: Decimal

	@IsInt()
	@Min(0)
	stock: number
}