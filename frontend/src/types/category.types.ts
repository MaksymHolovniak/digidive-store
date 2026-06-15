export type Category = {
  id: number;
  name: string;
  imagePath: string | null;
  parentId: number | null;
  parent?: {
    id: number;
    name: string;
  } | null;
  children?: Category[];
};
