import ViewListing from '@/components/modules/manage-listings/ViewListing';
import { getSingleListing } from '@/services/Listing';

const ViewListingPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  const { data: listing } = await getSingleListing(listingId);

  return (
    <div className="flex justify-center items-center my-5">
      <ViewListing listing={listing} />
    </div>
  );
};

export default ViewListingPage;
