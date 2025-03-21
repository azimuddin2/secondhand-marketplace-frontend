'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export const getAllUsers = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: {
          tags: ['USER'],
        },
      },
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleUser = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      headers: {
        Authorization: (await cookies()).get('accessToken')!.value,
      },
      next: {
        tags: ['USER'],
      },
    });
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUser = async (
  email: string,
  data: FieldValues,
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/${email}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: JSON.stringify(data),
      },
    );

    revalidateTag('USER');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteUser = async (id: string): Promise<any> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: (await cookies()).get('accessToken')!.value,
      },
    });

    revalidateTag('USER');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateUserStatus = async (id: string, status: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/users/change-status/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: JSON.stringify(status),
      },
    );

    revalidateTag('USER');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
