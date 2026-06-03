import type { Category } from "@/types/category.types";

export const getBreadcrumbsData = (
  categories: Category[],
  categoryId: number | string | undefined,
) => {
  const currentId = Number(categoryId);

  for (const parent of categories) {
    if (parent.id === currentId) {
      return {
        parentName: parent.name,
        parentPath: `/products/${parent.id}`,
        childName: undefined,
      };
    }

    const child = parent.children?.find((c) => c.id === currentId);

    if (child) {
      return {
        parentName: parent.name,
        parentPath: `/products/${parent.id}`,
        childName: child.name,
      };
    }
  }

  return {
    parentName: "Catalog",
    parentPath: "/products",
    childName: undefined,
  };
};
