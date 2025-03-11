import { Button } from '@/components/ui/button';
import ListingCard from '@/components/ui/core/ListingCard';
import { getAllListings } from '@/services/Listing';
import { IListing } from '@/types';
import Link from 'next/link';

const FeaturedListings = async () => {
  const { data: listings } = await getAllListings();

  return (
    <div className="bg-[#f7f7f7] my-12 lg:my-16 py-20">
      <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Featured Products Listing</h2>
          <Link href="/listings">
            <Button
              className="rounded-full font-semibold cursor-pointer"
              variant="outline"
            >
              See All Listings
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
          {listings
            ?.slice(0, 4)
            ?.map((listing: IListing, index: number) => (
              <ListingCard key={index} listing={listing} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedListings;
