'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

const ManageListings = () => {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-medium">Manage Listings</h2>
        <Button
          onClick={() => router.push('/user/listings/add-listing')}
          className="cursor-pointer"
        >
          <Plus /> Add Listing
        </Button>
      </div>
    </div>
  );
};

export default ManageListings;
