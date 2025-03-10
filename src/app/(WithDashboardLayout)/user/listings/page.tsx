import ManageListings from '@/components/modules/listings';
import { getAllListings } from '@/services/Listing';

const AllListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllListings(page, '1');

  return (
    <div>
      <ManageListings listings={data} meta={meta} />
    </div>
  );
};

export default AllListingsPage;
