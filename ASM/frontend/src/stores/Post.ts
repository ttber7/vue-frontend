export interface Product {
  id: number;
  name: string;
  title?: string;
  hot?: number;
  description: string;
  details?: string;
  content?: string;
  image: string;
  category: number | string;
  categoryName?: string;
  author?: string;
  createdAt?: string;
  views?: number;
  likes?: number;
  price?: number;
  discounted?: number;
  quantity?: number;
}

// Định danh Post để tương thích ngữ cảnh Blog
export type Post = Product;
