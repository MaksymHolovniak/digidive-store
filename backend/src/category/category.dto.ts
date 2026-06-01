import { Transform } from 'class-transformer'
import { IsOptional, IsString } from 'class-validator'

export class CreateCategoryDto {
	@IsString()
	name: string

	@IsOptional()
	@Transform(({ value }) => {
		if (value === '' || value === 'null') return null
		if (value === undefined) return undefined
		return Number(value)
	})
	parentId?: number | null
}

export class UpdateCategoryDto {
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@Transform(({ value }) => {
		if (value === '' || value === 'null') return null
		if (value === undefined) return undefined
		return Number(value)
	})
	parentId?: number | null
}