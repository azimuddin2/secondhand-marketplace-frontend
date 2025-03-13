export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
  phone?: string;
  images: string[];
  country?: string;
  city?: string;
  address?: string;
  education?: string;
  jobTitle?: string;
  company?: string;
  portfolio?: string;
  linkedInProfile?: string;
  facebookProfile?: string;
  isDeleted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  userId?: string;
  __v: number;
}
