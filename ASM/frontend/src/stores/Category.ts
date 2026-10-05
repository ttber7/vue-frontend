export interface Category {
    id: number;
    name: string;
    description?: string;
    parentId?: number | null;
    isActive: boolean;
    product:string
  }