import { Prisma } from "../../generated/prisma/client";

export const productReturnObject: Prisma.ProductSelect = {
    id: true,
    name: true,
    imagePath: true,
    description: true,
    price: true,
    stock: true
}
