import { IsEnum, IsOptional, IsString } from 'class-validator'
import { PaginationDto } from '../../pagination/pagination.dto'

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
}
