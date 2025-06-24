'use client';

import { Badge } from '@/components/ui/badge';
import DeleteConfirmationModal from '@/components/ui/core/SMModal/DeleteConfirmationModal';
import SMPagination from '@/components/ui/core/SMPagination';
import { SMTable } from '@/components/ui/core/SMTable';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { deleteUser, updateUserStatus } from '@/services/User';
import { IMeta, IUser } from '@/types';
import { ColumnDef } from '@tanstack/react-table';
import { Eye, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';
import { RxUpdate } from 'react-icons/rx';

type TUsersProps = {
  users: IUser[];
  meta: IMeta;
};

const statusOptions = [
  { label: 'In-progress', key: 'in-progress' },
  { label: 'Blocked', key: 'blocked' },
];

const UsersManagement = ({ users, meta }: TUsersProps) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleDelete = (data: IUser) => {
    setSelectedId(data._id);
    setSelectedItem(data.email);
    setModalOpen(true);
  };

  const handleStatusUpdate = async (userId: string, status: string) => {
    const toastId = toast.loading('Updating status...');

    const updateStatus = {
      status,
    };

    try {
      const res = await updateUserStatus(userId, updateStatus);
      if (res.success) {
        toast.success(res.message);
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to update status');
    } finally {
      toast.dismiss(toastId);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      if (selectedId) {
        const res = await deleteUser(selectedId);
        if (res.success) {
          toast.success(res.message);
          setModalOpen(false);
          router.refresh();
        } else {
          toast.error(res.message);
        }
      }
    } catch (err: any) {
      toast.error(err?.message);
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
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center capitalize px-3 py-1 cursor-pointer border border-gray-500 text-gray-700 bg-white rounded-md hover:bg-gray-100 active:bg-gray-200 transition-all">
            <RxUpdate className="mr-1" /> {row.original.status}
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40">
            {statusOptions.map((option) => (
              <DropdownMenuItem
                key={option.key}
                onClick={() => handleStatusUpdate(row.original._id, option.key)}
                className="capitalize px-3 py-2 hover:bg-gray-200"
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
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
