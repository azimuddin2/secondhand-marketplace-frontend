'use client';

import { useState } from 'react';
import ListingCard from '@/components/ui/core/ListingCard';
import SMPagination from '@/components/ui/core/SMPagination';
import { IListing, IMeta } from '@/types';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

type TListingsProps = {
  listings: IListing[];
  meta: IMeta;
};

const AllListings = ({ listings, meta }: TListingsProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });
  const [stockStatus, setStockStatus] = useState<string | null>(null);

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      listing.price >= priceRange.min &&
      listing.price <= priceRange.max &&
      (stockStatus ? listing?.status === stockStatus : true),
  );

  return (
    <div className="my-12">
      <div className="text-center lg:w-[60%] mx-auto">
        <h1 className="text-xl font-semibold mb-2">All Listing Products</h1>
        <p className="text-sm text-gray-500">
          A SecondHand Marketplace is an online or physical platform where
          individuals and businesses can buy and sell pre-owned (used) items.
        </p>
      </div>
      <div className="block lg:flex gap-6 mt-10">
        <FilterSidebar
          setPriceRange={setPriceRange}
          setStockStatus={setStockStatus}
        />
        <div className="w-full mt-2 lg:mb-0">
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Search here anything"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <Button>
              <Search />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredListings.map((listing: IListing, index: number) => (
              <ListingCard key={index} listing={listing} />
            ))}
          </div>
          <SMPagination totalPage={meta.totalPage} />
        </div>
      </div>
    </div>
  );
};

export default AllListings;
