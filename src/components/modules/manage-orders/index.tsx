'use client';

import { IMeta } from '@/types';
import { IOrder } from '@/types/order.type';
import { Badge } from '@/components/ui/badge';
import SMPagination from '@/components/ui/core/SMPagination';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ColumnDef } from '@tanstack/react-table';
import { RxUpdate } from 'react-icons/rx';
import { SMTable } from '@/components/ui/core/SMTable';

type TOrdersProps = {
  orders: IOrder[];
  meta: IMeta;
};

const statusOptions = [
  { label: 'Pending', key: 'Pending' },
  { label: 'Shipping', key: 'Shipping' },
  { label: 'Delivered', key: 'Delivered' },
];

const ManageOrders = ({ orders, meta }: TOrdersProps) => {
  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: 'buyerEmail',
      header: 'Customer Email',
      cell: ({ row }) => <span>{row.original.buyerEmail}</span>,
    },
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => <span>{row.original.createdAt.slice(0, 10)}</span>,
    },
    {
      accessorKey: 'itemTitle',
      header: 'Listing Title',
      cell: ({ row }) => <span>{row.original.itemTitle}</span>,
    },
    {
      accessorKey: 'price',
      header: 'Price',
      cell: ({ row }) => <span>${row.original.price}</span>,
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
                // onClick={() => handleStatusUpdate(row.original._id, option.key)}
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
      accessorKey: 'paid',
      header: 'Payment',
      cell: ({ row }) => (
        <div>
          {row?.original?.paid === true ? (
            <Badge className="capitalize text-green-500 border border-green-300 bg-green-100 rounded-sm hover:bg-green-100">
              Completed
            </Badge>
          ) : (
            <Badge className="capitalize  text-yellow-500 border border-yellow-300 bg-yellow-100 rounded-sm hover:bg-yellow-100">
              UNCompleted
            </Badge>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-medium">Orders Management</h2>
      </div>
      <SMTable columns={columns} data={orders || []} />
      <SMPagination totalPage={meta?.totalPage} />
    </div>
  );
};

export default ManageOrders;
