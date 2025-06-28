'use client';

import { useState, useEffect, useCallback } from 'react';
import ListingCard from '@/components/ui/core/ListingCard';
import SMPagination from '@/components/ui/core/SMPagination';
import { IListing, IMeta } from '@/types';
import FilterSidebar from './FilterSidebar/FilterSidebar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

type TListingsProps = {
  listings: IListing[];
  meta: IMeta;
};

const AllListings = ({ listings, meta }: TListingsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [searchInputValue, setSearchInputValue] = useState<string>(
    searchParams.get('searchTerm') || '',
  );

  const updateSearchParams = useCallback(
    (newParams: Record<string, string | null | undefined>) => {
      const currentParams = new URLSearchParams(searchParams.toString());
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          currentParams.delete(key);
        } else {
          currentParams.set(key, value);
        }
      });

      router.push(`?${currentParams.toString()}`);
    },
    [router, searchParams],
  );

  const handleSearch = () => {
    updateSearchParams({ searchTerm: searchInputValue, page: '1' });
  };

  useEffect(() => {
    setSearchInputValue(searchParams.get('searchTerm') || '');
  }, [searchParams]);

  return (
    <div className="my-12">
      <div className="text-center lg:w-[60%] mx-auto">
        <h1 className="text-xl font-semibold mb-2">All Listing Products</h1>
        <p className="text-sm text-gray-500">
          A SecondHand Marketplace is an online or physical platform where
          individuals and businesses can buy and sell pre-owned (used) items.
        </p>
      </div>
      <div className="block lg:flex gap-10 mt-10">
        <div className="w-75">
          <FilterSidebar />
        </div>
        <div className="w-full mt-2 lg:mb-0">
          <div className="flex items-center space-x-2 mb-4">
            <Input
              type="text"
              placeholder="Search here anything"
              value={searchInputValue}
              onChange={(e) => setSearchInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearch();
                }
              }}
              className="w-full px-4 py-2 border rounded"
            />
            <Button onClick={handleSearch}>
              <Search />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.length > 0 ? (
              listings.map((listing: IListing) => (
                <ListingCard key={listing._id} listing={listing} />
              ))
            ) : (
              <p className="col-span-full h-screen text-center text-gray-500">
                No listings found matching your search.
              </p>
            )}
          </div>
          <SMPagination totalPage={meta.totalPage} />
        </div>
      </div>
    </div>
  );
};

export default AllListings;
