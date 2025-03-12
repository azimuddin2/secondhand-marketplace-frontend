import ViewUserProfile from '@/components/modules/users-management/ViewUserProfile';
import { getSingleUser } from '@/services/User';

const ViewUserProfilePage = async ({
  params,
}: {
  params: Promise<{ userId: string }>;
}) => {
  const { userId } = await params;

  const { data: user } = await getSingleUser(userId);

  return (
    <div>
      <ViewUserProfile user={user} />
    </div>
  );
};

export default ViewUserProfilePage;
