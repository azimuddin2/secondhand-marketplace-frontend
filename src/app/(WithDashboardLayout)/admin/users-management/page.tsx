import UsersManagement from '@/components/modules/users-management';
import { getAllUsers } from '@/services/User';

const UsersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;

  const { data, meta } = await getAllUsers(page, '8');

  return (
    <div>
      <UsersManagement users={data} meta={meta} />
    </div>
  );
};

export default UsersManagementPage;
