'use client';

import { useUser } from '@/context/UserContext';
import { getOrdersByEmail } from '@/services/Order';
import { useEffect, useState } from 'react';
import { IOrder } from '@/types/order.type';
import { Badge } from '@/components/ui/badge';
import { ColumnDef } from '@tanstack/react-table';
import { SMTable } from '@/components/ui/core/SMTable';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';

const MyOrder = () => {
  const { user } = useUser();
  const email = user?.email;
  const [orderListing, setOrderListing] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      const data = await getOrdersByEmail(email);

      if (data.error) {
        toast.error(data.error.message);
      } else {
        setOrderListing(data.data);
      }
    };

    loadOrders();
  }, [email]);

  const columns: ColumnDef<IOrder>[] = [
    {
      accessorKey: 'buyerEmail',
      header: 'Email',
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
        <div>
          {(() => {
            const status = row?.original?.status;

            switch (status) {
              case 'Pending':
                return (
                  <Badge className="capitalize text-blue-500 border border-blue-300 bg-blue-100 rounded-sm hover:bg-blue-100">
                    Pending
                  </Badge>
                );
              case 'Shipping':
                return (
                  <Badge className="capitalize text-yellow-600 border border-yellow-300 bg-yellow-100 rounded-sm hover:bg-yellow-100">
                    Shipping
                  </Badge>
                );
              case 'Delivered':
                return (
                  <Badge className="capitalize text-green-600 border border-green-300 bg-green-100 rounded-sm hover:bg-green-100">
                    Delivered
                  </Badge>
                );
              default:
                return (
                  <Badge className="capitalize text-gray-500 border border-gray-300 bg-gray-100 rounded-sm">
                    Unknown
                  </Badge>
                );
            }
          })()}
        </div>
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
            <Button className="cursor-pointer">Pay</Button>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-medium">My Orders</h2>
      </div>
      <SMTable columns={columns} data={orderListing || []} />
    </div>
  );
};

export default MyOrder;
