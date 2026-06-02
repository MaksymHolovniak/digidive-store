import {
	IsInt,
	IsNumber,
	IsOptional,
	IsString,
	MaxLength,
	Min,
	MinLength
} from 'class-validator'
import { Prisma } from '../../../generated/prisma/client'
import { Decimal } from '@prisma/client/runtime/index-browser'
import { Transform } from 'class-transformer'

export class CreateProductDto implements Prisma.ProductUpdateInput {
	@IsString()
	name: string

	@IsString()
	@MinLength(70)
	@MaxLength(1000)
	description: string

	@Transform(({ value }) => Number(value))
	@IsNumber({ maxDecimalPlaces: 2 })
	@Min(0)
	price: Decimal

	@Transform(({ value }) => Number(value))
	@IsInt()
	@Min(0)
	stock: number

	@IsOptional()
	@Transform(({ value }) => Number(value))
	@IsNumber()
	@Min(0)
	warrantyMonths?: number

	@Transform(({ value }) => Number(value))
	@IsInt()
	brandId: number

	@Transform(({ value }) => Number(value))
	@IsInt()
	categoryId: number
}

export class UpdateProductDto implements Prisma.ProductUpdateInput {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	@MinLength(70)
	@MaxLength(1000)
	description?: string

	@IsOptional()
	@Transform(({ value }) => {
		if (value === undefined || value === '') return undefined
		return Number(value)
	})
	@IsNumber({ maxDecimalPlaces: 2 })
	@Min(0)
	price?: Decimal

	@IsOptional()
	@Transform(({ value }) => {
		if (value === undefined || value === '') return undefined
		return Number(value)
	})
	@IsInt()
	@Min(0)
	stock?: number

	@IsOptional()
	@Transform(({ value }) => {
		if (value === undefined || value === '') return undefined
		return Number(value)
	})
	@IsNumber()
	@Min(0)
	warrantyMonths?: number

	@IsOptional()
	@Transform(({ value }) => {
		if (value === undefined || value === '') return undefined
		return Number(value)
	})
	@IsInt()
	brandId?: number

	@IsOptional()
	@Transform(({ value }) => {
		if (value === undefined || value === '') return undefined
		return Number(value)
	})
	@IsInt()
	categoryId?: number
}
