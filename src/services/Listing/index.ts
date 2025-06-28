'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';
import { FieldValues } from 'react-hook-form';

export const addListing = async (data: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/listings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: (await cookies()).get('accessToken')!.value,
      },
      body: JSON.stringify(data),
    });

    revalidateTag('LISTING');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getAllListings = async (
  page?: string,
  limit?: string,
  query?: { [key: string]: string | string[] | undefined },
) => {
  const params = new URLSearchParams();

  if (query?.price) {
    params.append('minPrice', '0');
    params.append('maxPrice', query?.price.toString());
  }

  if (query?.category) {
    params.append('category', query?.category.toString());
  }

  if (query?.searchTerm) {
    params.append('searchTerm', query?.searchTerm.toString());
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings?page=${page}&limit=${limit}&${params}`,
      {
        next: {
          tags: ['LISTING'],
        },
      },
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const getSingleListing = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
      {
        next: {
          tags: ['LISTING'],
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error: any) {
    return Error(error);
  }
};

export const getListingsByEmail = async (email?: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings?email=${email}`,
      {
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        next: {
          tags: ['LISTING'],
        },
      },
    );

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const updateListing = async (
  id: string,
  data: FieldValues,
): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: (await cookies()).get('accessToken')!.value,
        },
        body: JSON.stringify(data),
      },
    );

    revalidateTag('LISTING');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};

export const deleteListing = async (id: string): Promise<any> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/listings/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: (await cookies()).get('accessToken')!.value,
        },
      },
    );

    revalidateTag('LISTING');

    return res.json();
  } catch (error: any) {
    return Error(error);
  }
};
