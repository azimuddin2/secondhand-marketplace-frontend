'use client';

import { Button } from '@/components/ui/button';
import { useUser } from '@/context/UserContext';
import { currencyFormatter } from '@/lib/currencyFormatter';
import { addOrder } from '@/services/Order';
import { IListing } from '@/types';
import { CircleArrowRight, Minus, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler } from 'react-hook-form';
import { toast } from 'sonner';

const ListingDetails = ({ listing }: { listing: IListing }) => {
  const { user } = useUser();
  const { title, price, images, description, status, condition } = listing;
  const [selectedImage, setSelectedImage] = useState(listing.images[0]);
  const [quantity, setQuantity] = useState<number>(1);
  const [isReadMore, setIsReadMore] = useState<boolean>(true);
  const router = useRouter();

  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  const handleOrder: SubmitHandler<FieldValues> = async (data) => {
    try {
      const modifiedData = {
        sellerId: data.userID,
        buyerId: user?.userId,
        buyerEmail: user?.email,
        itemId: data._id,
        itemTitle: data.title,
        price: parseFloat(data.price),
      };

      const res = await addOrder(modifiedData);
      console.log(res);
      if (res?.success) {
        toast.success(res?.message);
        // router.push('/user/listings');
      } else {
        toast.error(res?.message);
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  return (
    <div className="my-8 bg-[#F7F7F7]  rounded-xl grid grid-cols-1 lg:grid-cols-2 gap-5 p-5">
      {/* Listing Image Section */}
      <div>
        <div className="bg-gray-100 border-2 border-white rounded-lg flex items-center justify-center h-[400px] relative">
          <Image
            src={selectedImage}
            alt="Product Image"
            width={400}
            height={400}
            className="rounded p-3"
          />
        </div>
        <div className="gap-3 mt-4 flex justify-center">
          {images?.map((image, index) => (
            <button
              key={index}
              className={`border-2 rounded-md p-1 ${
                selectedImage === image ? 'border-black' : 'border-gray-300'
              }`}
              onClick={() => setSelectedImage(image)}
            >
              <Image
                src={image}
                alt="Thumbnail"
                width={60}
                height={60}
                className="rounded-md cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Listing Info */}
      <div className="bg-white rounded-lg p-5">
        <h2 className="font-bold text-xl mb-4">{title}</h2>
        <p className="text-justify text-gray-500 font-light text-sm">
          {isReadMore ? description.slice(0, 200) + '...' : description}
          <span onClick={toggleReadMore} className="inline">
            {isReadMore ? (
              <span className="link font-semibold text-primary cursor-pointer">
                more?
              </span>
            ) : (
              <span className="link font-semibold text-primary ms-1 cursor-pointer">
                less
              </span>
            )}
          </span>
        </p>
        <div className="flex items-center justify-between my-5 text-gray-500 text-xs">
          <p className="rounded-full px-4 py-1 bg-gray-100 flex items-center justify-center gap-1">
            <Star className="w-4 h-4" fill="orange" stroke="orange" />
            {5} Ratings
          </p>
          <p className="rounded-full px-4 py-1 bg-gray-100 capitalize">
            Status: {status}
          </p>
          <p className="rounded-full px-4 py-1 bg-gray-100 capitalize">
            Condition: {condition}
          </p>
        </div>
        <hr />
        <p className="my-2 font-bold">
          Price:{' '}
          <span className="font-semibold">{currencyFormatter(price)}</span>
        </p>
        <hr />

        {/* Quantity & Stock */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-gray-600 text-sm mr-2">Quantity </p>
            <Button
              onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              variant="outline"
              className="size-8 rounded-sm bg-white"
            >
              <Minus className="w-4 h-4" />
            </Button>
            <p className="font-medium text-lg p-2">{quantity}</p>
            <Button
              onClick={() => setQuantity(quantity + 1)}
              variant="outline"
              className="size-8 rounded-sm bg-white"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          <span className="text-gray-700 text-sm capitalize">
            Stock: {status}
          </span>
        </div>
        <div className="flex items-end justify-end">
          <Button
            disabled={user?.email === undefined || user?.role === 'admin'}
            onClick={() => handleOrder(listing)}
            className="w-full mt-10 cursor-pointer"
          >
            Order Now <CircleArrowRight />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ListingDetails;
