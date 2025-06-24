import ManageListings from '@/components/modules/manage-listings';
import { getAllListings } from '@/services/Listing';

const ManageListingsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllListings(page, '10');

  return (
    <div>
      <ManageListings listings={data} meta={meta} />
    </div>
  );
};

export default ManageListingsPage;
