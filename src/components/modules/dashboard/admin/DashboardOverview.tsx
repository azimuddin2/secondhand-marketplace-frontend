import DashboardCard from './DashboardCard';

const DashboardOverview = () => {
  return (
    <div>
      <main className="mb-6">
        <h1 className="text-2xl font-medium mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <DashboardCard
            title="Total Order"
            value="25,471"
            change={2.56}
            isIncrease
          />
          <DashboardCard
            title="Total Income"
            value="$40,832.32"
            change={2.56}
            isIncrease
          />
          <DashboardCard
            title="New Customer"
            value="1,832"
            change={7.56}
            isIncrease={false}
          />
          <DashboardCard
            title="Impressions"
            value="40,832"
            change={2.56}
            isIncrease
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardOverview;
