export interface Product {
  additionalInformation?: string;
  productId?: string;
  category?: string[];
  productName?: string;
  imgUrl?: string;
  imageList?: ProductImage[];
  caption?: string;
  description?: string;
  options?: ProductOptions;
  price?: number;
  reviews?: ProductReview[];
  tags?: string[];
}

export class ProductImage {
  src?: string;
  caption?: string;
  title?: string;
  alt?: string;
  size?: { height: number; width: number };
  keywords?: string[];
}

export interface ProductReview {
  name?: string;
  date?: Date;
  text?: string;
  stars?: number;
}

export interface ProductOptions {
  colors?: string[];
  sizes?: string;
  packages?: any;
  quantity?: number;
}
