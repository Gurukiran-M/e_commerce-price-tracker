export type PriceHistoryItem = {
  price: number;
};

export type User = {
  email: string;
};

export type Products = {
  _id?: string;
  url: string;
  currency: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  priceHistory: PriceHistoryItem[] | [];
  highestPrice: number;
  lowestPrice: number;
  averagePrice: number;
  discountRate: number;
  description: string;
  category: string;
  reviewsCount: number;
  stars: number;
  isOutOfStock: Boolean;
  users?: User[];
};

export type ProductDescription = {
  specifications: any,
  features: Array<any>
}

export type SearchResult = {
  productName: string,
  currentPrice: number,
  currency: string,
  productLink: string,
  thumbnail: string,
  site: string
}

export type NotificationType =
  | "WELCOME"
  | "CHANGE_OF_STOCK"
  | "LOWEST_PRICE"
  | "THRESHOLD_MET";

export type EmailContent = {
  subject: string;
  body: string;
};

export type EmailProductInfo = {
  title: string;
  url: string;
  image: string;
};
