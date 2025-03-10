export interface IListing {
  _id: string;
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
