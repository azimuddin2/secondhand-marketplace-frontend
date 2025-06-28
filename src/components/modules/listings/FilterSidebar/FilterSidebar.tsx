'use client';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TListingCategory } from '@/types';
import { Checkbox } from '@radix-ui/react-checkbox';

export default function FilterSidebar() {
  const [price, setPrice] = useState([0]);

  const categories: TListingCategory[] = [
    'computer',
    'gadgets',
    'game',
    'kitchen',
    'electronics',
    'lifestyle',
    'mobile',
    'routers',
    'shoe',
    'watch',
  ];

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleSearchQuery = (query: string, value: string | number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set(query, value.toString());

    router.push(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className=" rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Filter</h2>
        {searchParams.toString().length > 0 && (
          <Button
            onClick={() => {
              router.push(`${pathname}`, {
                scroll: false,
              });
            }}
            size="sm"
            className="bg-black hover:bg-gray-700 ml-5"
          >
            Clear Filters
          </Button>
        )}
      </div>
      {/* Filter by Price */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Price</h2>
        <div className="flex items-center justify-between text-sm mb-2">
          <span>$0</span>
          <span>$1000</span>
        </div>
        <Slider
          max={1000}
          step={1}
          onValueChange={(value) => {
            setPrice(value);
            handleSearchQuery('price', value[0]);
          }}
          className="w-full"
        />
        <p className="text-sm mt-2">Selected Price: ${price[0]}</p>
      </div>
      {/* Product Types */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-4">Listings Category</h2>
        <RadioGroup className="space-y-0">
          {categories?.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <RadioGroupItem
                onClick={() => handleSearchQuery('category', category)}
                value={category}
              />
              <Label
                htmlFor={category}
                className="text-gray-600 font-light text-base"
              >
                {category}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Rating */}
      <div>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Star className="w-5 h-5 text-yellow-500" /> Rating
        </h3>
        <div className="mt-2 space-y-2">
          {[5, 4, 3, 2, 1].map((stars) => (
            <label
              key={stars}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox id={`rating-${stars}`} />
              <span className="text-yellow-500 text-lg">
                {'★'.repeat(stars) + '☆'.repeat(5 - stars)}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
