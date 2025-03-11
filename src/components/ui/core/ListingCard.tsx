'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card';
import Image from 'next/image';
import { Button } from '../button';
import { CircleArrowRight, Heart } from 'lucide-react';
import { IListing } from '@/types';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { useRouter } from 'next/navigation';

const ListingCard = ({ listing }: { listing: IListing }) => {
  const router = useRouter();
  const { title, images, price, status } = listing;

  return (
    <Card className="p-2 pb-5 shadow-none border-none rounded">
      <CardHeader className="relative p-0">
        <div className="h-1/2">
          <Image
            src={
              images[0] ||
              'https://psediting.websites.co.in/obaju-turquoise/img/product-placeholder.png'
            }
            width={500}
            height={500}
            alt="product image"
            className="rounded-sm"
          />
        </div>
        {status === 'sold' && (
          <div className="absolute left-2 top-2 text-sm bg-red-500 text-white px-2 rounded-full">
            Out of Stock
          </div>
        )}
      </CardHeader>

      <CardContent className="">
        <CardTitle
          title={title}
          className="font-semibold cursor-pointer text-sm"
        >
          {title.length > 30 ? title.slice(0, 30) + '...' : title}
        </CardTitle>

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 mt-2">
            {currencyFormatter(price)}
          </p>
        </div>
      </CardContent>

      <CardFooter className="block">
        <div className="flex gap-2 items-center justify-between">
          <Button
            onClick={() => router.push(`/listings/${listing._id}`)}
            disabled={status === 'sold'}
            size="sm"
            className="w-32 rounded cursor-pointer"
          >
            Buy Now <CircleArrowRight />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 flex items-center cursor-pointer justify-center rounded-full"
          >
            <Heart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ListingCard;
