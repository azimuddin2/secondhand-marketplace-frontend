import UpdateListingForm from '@/components/modules/listings/UpdateListingForm';
import { getSingleListing } from '@/services/Listing';

const UpdateListingPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  const { data: listing } = await getSingleListing(listingId);

  return (
    <div className="flex justify-center items-center my-5">
      <UpdateListingForm listing={listing} />
    </div>
  );
};

export default UpdateListingPage;
