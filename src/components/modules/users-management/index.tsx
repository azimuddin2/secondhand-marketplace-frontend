'use client';

import { Badge } from '@/components/ui/badge';
import DeleteConfirmationModal from '@/components/ui/core/SMModal/DeleteConfirmationModal';
import SMPagination from '@/components/ui/core/SMPagination';
import { SMTable } from '@/components/ui/core/SMTable';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { deleteUser } from '@/services/User';
import { IMeta, IUser } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

type TUsersProps = {
  users: IUser[];
  meta: IMeta;
};

const UsersManagement = ({ users, meta }: TUsersProps) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: IUser) => {
    setSelectedId(data?._id);
    setSelectedItem(data?.email);
    setModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteUser(selectedId);
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

  const columns: ColumnDef<IUser>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => <span className="truncate">{row.original.name}</span>,
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => <span>{row.original.email}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Joined',
      cell: ({ row }) => <span>{row.original.createdAt.slice(0, 10)}</span>,
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <Badge className="capitalize text-blue-500 border border-blue-300 bg-blue-100 rounded-sm hover:bg-green-100">
          {row.original.role}
        </Badge>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => (
        <div>
          {row.original.status === 'in-progress' ? (
            <Badge className="capitalize text-green-500 border border-green-300 bg-green-100 rounded-sm hover:bg-green-100">
              {row.original.status}
            </Badge>
          ) : (
            <Badge className="capitalize text-red-500 border border-red-300 bg-red-100 hover:bg-red-100 rounded-sm">
              {row.original.status}
            </Badge>
          )}
        </div>
      ),
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
                      `/admin/users-management/view-profile/${row.original._id}`,
                    )
                  }
                  size={20}
                  className="text-blue-500 cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent>View Profile</TooltipContent>
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
        <h2 className="text-xl font-medium">Users Management</h2>
      </div>
      <SMTable columns={columns} data={users || []} />
      <SMPagination totalPage={meta?.totalPage} />
      <DeleteConfirmationModal
        name={selectedItem}
        isOpen={isModalOpen}
        onOpenChange={setModalOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
};

export default UsersManagement;
