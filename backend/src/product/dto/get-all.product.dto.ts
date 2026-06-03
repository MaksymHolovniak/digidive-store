import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '../../pagination/pagination.dto'
import { Transform } from 'class-transformer'

export enum EnumProductSort {
	CHEAPER = 'cheaper',
	EXPENSIVE = 'expensive',
	Alphabetical = 'alphabetical'
}

export class GetAllProductDto extends PaginationDto {
	@IsOptional()
	@IsEnum(EnumProductSort)
	sort?: EnumProductSort

	@IsOptional()
	@IsString()
	searchTerm?: string

	@IsOptional()
	@IsString()
	brand?: string

	@IsOptional()
	@Transform(({ value }) => +value) 
	minPrice?: number

	@IsOptional()
	@Transform(({ value }) => +value) 
	maxPrice?: number
}
