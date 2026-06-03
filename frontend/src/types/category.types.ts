export type Category = {
    id: number,
    name: string, 
    imagePath: string | null
    parentId: number | null
    children?: Category[]
}