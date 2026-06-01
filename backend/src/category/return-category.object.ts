import { Prisma } from '../../generated/prisma/client'

export const categoryReturnObject: Prisma.CategorySelect = {
	id: true,
    name: true,
	parent: {
		select: {
			id: true,
			name: true
		}
	}
}

