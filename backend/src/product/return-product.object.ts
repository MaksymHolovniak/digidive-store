import { Prisma } from '../../generated/prisma/client'
import { brandReturnObject } from '../brand/return-brand.object'
import { categoryReturnObject } from '../category/return-category.object'

export const productReturnObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	imagePath: true,
	description: true,
	price: true,
	stock: true,
	warrantyMonths: true,
	category: {
		select: categoryReturnObject
	},
	brand: {
		select: brandReturnObject
	}
}

export const productGetReturnObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	imagePath: true,
	description: true,
	price: true,
	stock: true,
	brand: {
		select: brandReturnObject
	}
}

export const productOrderReturnObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	imagePath: true,
	price: true,
	isActive: true,
	brand: {
		select: brandReturnObject
	}
}

export const productAdminReturnObject: Prisma.ProductSelect = {
	id: true,
	name: true,
	imagePath: true,
	description: true,
	price: true,
	stock: true,
	warrantyMonths: true,
	isActive: true,
	category: {
		select: categoryReturnObject
	},
	brand: {
		select: brandReturnObject
	}
}