'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';
import { Filter, Check, Star } from 'lucide-react';

const FilterSidebar = ({
  setPriceRange,
  setStockStatus,
}: {
  setPriceRange: (val: { min: number; max: number }) => void;
  setStockStatus: (status: string | null) => void;
}) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [selectedStock, setSelectedStock] = useState<string | null>(null);

  const handlePriceChange = () => {
    setPriceRange({ min: minPrice, max: maxPrice });
  };

  const handleStockChange = (status: string) => {
    const newStatus = selectedStock === status ? null : status;
    setSelectedStock(newStatus);
    setStockStatus(newStatus); // Update stock filter in parent
  };

  return (
    <div>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="md:hidden flex items-center gap-2"
          >
            <Filter className="w-5 h-5" />
            Filters
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 p-4">
          <SidebarContent
            minPrice={minPrice}
            maxPrice={maxPrice}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            handlePriceChange={handlePriceChange}
            selectedStock={selectedStock}
            handleStockChange={handleStockChange}
          />
        </SheetContent>
      </Sheet>

      <aside className="hidden md:block w-72 bg-white rounded sticky top-0 mt-2 p-4">
        <SidebarContent
          minPrice={minPrice}
          maxPrice={maxPrice}
          setMinPrice={setMinPrice}
          setMaxPrice={setMaxPrice}
          handlePriceChange={handlePriceChange}
          selectedStock={selectedStock}
          handleStockChange={handleStockChange}
        />
      </aside>
    </div>
  );
};

const SidebarContent = ({
  minPrice,
  maxPrice,
  setMinPrice,
  setMaxPrice,
  handlePriceChange,
  selectedStock,
  handleStockChange,
}: {
  minPrice: number;
  maxPrice: number;
  setMinPrice: (val: number) => void;
  setMaxPrice: (val: number) => void;
  handlePriceChange: () => void;
  selectedStock: string | null;
  handleStockChange: (status: string) => void;
}) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" /> Filter By Price
        </h3>
        <div className="flex items-center space-x-2 mt-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="w-1/2 p-2 border rounded"
          />
          <span>-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-1/2 p-2 border rounded"
          />
        </div>
        <Slider
          value={[minPrice, maxPrice]}
          onValueChange={([min, max]) => {
            setMinPrice(min);
            setMaxPrice(max);
          }}
          max={1000}
          step={10}
          className="mt-4"
        />
        <Button
          onClick={handlePriceChange}
          className="mt-2 w-full cursor-pointer"
        >
          Apply
        </Button>
      </div>

      <FilterSection
        title="Stock Status"
        options={['available', 'sold']}
        selected={selectedStock}
        onChange={handleStockChange}
      />

      {/* Product Types */}
      <FilterSection
        selected={selectedStock}
        onChange={handleStockChange}
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
          'Collectibles ',
        ]}
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
    </div>
  );
};

const FilterSection = ({
  title,
  options,
  selected,
  onChange,
}: {
  title: string;
  options: string[];
  selected: string | null;
  onChange: (status: string) => void;
}) => (
  <div>
    <h3 className="font-semibold text-lg flex items-center gap-2">
      <Check className="w-5 h-5 text-gray-600" /> {title}
    </h3>
    <div className="mt-2 space-y-2">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2 cursor-pointer">
          <Checkbox
            id={option}
            checked={selected === option}
            onCheckedChange={() => onChange(option)}
          />
          <span>{option}</span>
        </label>
      ))}
    </div>
  </div>
);

export default FilterSidebar;
