'use client';

import ListingCard from '@/components/ui/core/ListingCard';
import SMPagination from '@/components/ui/core/SMPagination';
import { IListing, IMeta } from '@/types';
import FilterSidebar from './FilterSidebar/FilterSidebar';

type TListingsProps = {
  listings: IListing[];
  meta: IMeta;
};

const AllListings = ({ listings, meta }: TListingsProps) => {
  return (
    <div className="my-12">
      <div className="text-center lg:w-[60%] mx-auto">
        <h1 className="text-xl font-semibold mb-2">All Listing Products</h1>
        <p className="text-sm text-gray-500">
          A SecondHand Marketplace is an online or physical platform where
          individuals and businesses can buy and sell pre-owned (used) items.
        </p>
      </div>
      <div className="flex gap-6 mt-10">
        <div>
          <FilterSidebar />
        </div>
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {listings?.map((listing: IListing, index: number) => (
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
