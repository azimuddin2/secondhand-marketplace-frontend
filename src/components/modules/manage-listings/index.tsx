'use client';

import { Button } from '@/components/ui/button';
import DeleteConfirmationModal from '@/components/ui/core/SMModal/DeleteConfirmationModal';
import SMPagination from '@/components/ui/core/SMPagination';
import { SMTable } from '@/components/ui/core/SMTable';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { deleteListing } from '@/services/Listing';
import { IListing, IMeta } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FaRegEdit } from 'react-icons/fa';
import { toast } from 'sonner';

type TListingsProps = {
  listings: IListing[];
  meta: IMeta;
};

const ManageListings = ({ listings, meta }: TListingsProps) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: IListing) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.title);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteListing(selectedId);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      console.error(err?.message);
    }
  };

  const columns: ColumnDef<IListing>[] = [
    {
      accessorKey: 'title',
      header: 'Title',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <Image
            src={row.original.images[0]}
            alt={row.original.title}
            width={40}
            height={40}
            className="w-8 h-8 rounded-full"
          />
          <span className="truncate">{row.original.title}</span>
        </div>
      ),
    },
    {
      accessorKey: 'condition',
      header: 'Condition',
      cell: ({ row }) => <span>{row.original.condition}</span>,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => <span>{row.original.status}</span>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <span>$ {row.original.price.toFixed(2)}</span>,
    },
    {
      accessorKey: 'action',
      header: 'Action',
      cell: ({ row }) => (
        <div className="flex items-center space-x-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Eye
                  onClick={() =>
                    router.push(
                      `/user/listings/view-listing/${row.original._id}`,
                    )
                  }
                  size={20}
                  className="text-blue-500 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>View</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <FaRegEdit
                  onClick={() =>
                    router.push(
                      `/user/listings/update-listing/${row.original._id}`,
                    )
                  }
                  size={20}
                  className="text-green-500 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>Edit</TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Trash2
                  onClick={() => handleDelete(row.original)}
                  size={20}
                  className="text-red-500 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>Delete</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ),
    },
  ];

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
      <SMTable columns={columns} data={listings || []} />
      <SMPagination totalPage={meta.totalPage} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default ManageListings;
