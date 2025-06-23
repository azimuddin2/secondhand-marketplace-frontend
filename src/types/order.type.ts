export interface IOrder {
  _id: string;
  sellerId: string;
  buyerId: string;
  buyerEmail: string;
  itemId: string;
  itemTitle: string;
  price: number;
  status: 'Pending' | 'Shipping' | 'Delivered';
  paid: boolean;
  transactionId?: string;
  createdAt: string;
  updatedAt: string;
}
