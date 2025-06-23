'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export const addOrder = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (await cookies()).get('accessToken')!.value,
      },
      body: JSON.stringify(data),
    });

    revalidateTag('ORDER');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllOrders = async (page?: string, limit?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders?page=${page}&limit=${limit}`,
      {
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: {
          tags: ['ORDER'],
        },
      },
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getOrdersByEmail = async (email?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/my-orders?email=${email}`,
      {
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: {
          tags: ['ORDER'],
        },
      },
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateOrderStatus = async (id: string, status: FieldValues) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/orders/change-status/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: JSON.stringify(status),
      },
    );

    revalidateTag('ORDER');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};