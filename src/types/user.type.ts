export interface IUser {
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
  image?: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
