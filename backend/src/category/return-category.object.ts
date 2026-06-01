import { Prisma } from '../../generated/prisma/client'

export const returnCategoryObject: Prisma.CategorySelect = {
	id: true,
    name: true,
    imagePath: true,
	parentId: true,
	children: {
		select: {
			id: true,
			name: true
		}
	}
}
