import ManageListings from '@/components/modules/listings';
import { getAllListings } from '@/services/Listing';

const AllListingsPage = async () => {
  const { data } = await getAllListings();

  return (
    <div>
      <ManageListings listings={data} />
    </div>
  );
};

export default AllListingsPage;
