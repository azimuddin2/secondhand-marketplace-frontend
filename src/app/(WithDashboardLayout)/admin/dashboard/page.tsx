import AdminDashboardChart from '@/components/modules/dashboard/admin';
import DashboardOverview from '@/components/modules/dashboard/admin/DashboardOverview';

const AdminDashboardPage = () => {
  return (
    <div>
      <DashboardOverview />
      <AdminDashboardChart />
    </div>
  );
};

export default AdminDashboardPage;
