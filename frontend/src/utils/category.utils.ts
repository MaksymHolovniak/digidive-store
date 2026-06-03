import type { Category } from "@/types/category.types";

export const getMainCategory = (
  categories: Category[],
  categoryId: number | string | undefined,
): Category | null => {
  const currentId = Number(categoryId);
  if (!currentId || !categories.length) return null;

  for (const parent of categories) {
    if (parent.id === currentId) return parent;

    const hasChild = parent.children?.some((c) => c.id === currentId);
    if (hasChild) return parent;
  }

  return null;
};