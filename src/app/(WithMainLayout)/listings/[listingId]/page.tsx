import ContactInfo from '@/components/modules/home/ContactInfo';
import ListingDetails from '@/components/modules/listings/ListingDetails';
import { getSingleListing } from '@/services/Listing';

const ListingDetailsPage = async ({
  params,
}: {
  params: Promise<{ listingId: string }>;
}) => {
  const { listingId } = await params;

  const { data: listing } = await getSingleListing(listingId);

  return (
    <div className="max-w-screen-xl mx-auto px-3 lg:px-5">
      <ListingDetails listing={listing} />
      <ContactInfo />
    </div>
  );
};

export default ListingDetailsPage;
