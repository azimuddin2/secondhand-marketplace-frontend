'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, Star, Check, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const FilterSidebar = () => {
  const [price, setPrice] = useState([300]);

  return (
    <div>
      {/* Mobile Filter Button */}
      <div className="md:hidden fixed top-4 left-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-4">
            <SidebarContent price={price} setPrice={setPrice} />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 bg-white rounded sticky top-0 mt-2">
        <div className="mb-5 flex flex-grow justify-center max-w-lg items-center space-x-2 bg-white rounded border">
          <Input
            type="text"
            placeholder="Search here anything"
            className="px-4 py-2 m-0 shadow-none border-none bg-white w-full rounded rounded-r-none focus:outline-none focus:ring-1 focus:ring-[#693AF8]"
          />
          <Button className="px-4 text-white rounded rounded-l-none transition cursor-pointer">
            <Search />
          </Button>
        </div>
        <SidebarContent price={price} setPrice={setPrice} />
      </aside>
    </div>
  );
};

const SidebarContent = ({
  price,
  setPrice,
}: {
  price: number[];
  setPrice: (val: number[]) => void;
}) => {
  return (
    <div className="space-y-6">
      {/* Price Filter */}
      <div>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" /> Filter By Price
        </h3>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="number"
            placeholder="Min"
            className="w-1/2 p-2 border rounded"
          />
          <span>-</span>
          <input
            type="number"
            placeholder="Max"
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <Slider
          value={price}
          onValueChange={setPrice}
          max={1000}
          step={10}
          className="mt-4"
        />
      </div>

      {/* Product Types */}
      <FilterSection
        title="Product Types"
        options={[
          'Electronics',
          'Fashion & Apparel',
          'Home & Furniture',
          'Vehicles',
          'Books & Stationery',
          'Sports & Fitness',
          'Baby & Kids',
          'Musical Instruments',
          'Health & Beauty',
          'Collectibles & Antiques',
        ]}
      />

      {/* Brands */}
      <FilterSection
        title="Brands"
        options={['HP', 'Apple', 'Dell', 'Asus', 'Canon']}
      />

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

      {/* Availability */}
      <FilterSection
        title="Availability"
        options={['In Stock', 'Pre Order', 'Upcoming']}
      />
    </div>
  );
};

const FilterSection = ({
  title,
  options,
}: {
  title: string;
  options: string[];
}) => (
  <div>
    <h3 className="font-semibold text-lg flex items-center gap-2">
      <Check className="w-5 h-5 text-gray-600" /> {title}
    </h3>
    <div className="mt-2 space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2 cursor-pointer">
          <Checkbox id={option} />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default FilterSidebar;
