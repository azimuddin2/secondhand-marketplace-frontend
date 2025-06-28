export type TListingCategory =
  | 'computer'
  | 'gadgets'
  | 'game'
  | 'kitchen'
  | 'electronics'
  | 'lifestyle'
  | 'mobile'
  | 'routers'
  | 'shoe'
  | 'watch';

export interface IListing {
  _id: string;
  category: TListingCategory;
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'used';
  images: string[];
  userID: string;
  status: 'available' | 'sold';
  createdAt: string;
  updatedAt: string;
}
