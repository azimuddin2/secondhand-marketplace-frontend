import ManageOrders from '@/components/modules/manage-orders';
import { getAllOrders } from '@/services/Order';

const ManageOrdersPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllOrders(page, '8');

  return (
    <div>
      <ManageOrders orders={data} meta={meta} />
    </div>
  );
};

export default ManageOrdersPage;
