export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  image?: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  __v: number;
}
