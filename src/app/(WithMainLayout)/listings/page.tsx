import AllListings from '@/components/modules/listings';
import { getAllListings } from '@/services/Listing';

const AllListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data, meta } = await getAllListings(page, '3');

  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
      <AllListings listings={data} meta={meta} />
    </div>
  );
};

export default AllListingsPage;
