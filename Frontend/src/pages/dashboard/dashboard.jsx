import { useEffect, useContext } from "react";
import { Users, Briefcase, IndianRupee } from "lucide-react";
import { AppContext } from "../../context/AppContext";
import Loading from "../../components/Loading";

import StatCard from "../../components/dashboard/StatCard";
import SectionCard from "../../components/dashboard/SectionCard";
import BreakdownList from "../../components/dashboard/BreakdownList";
import RevenueChart from "../../components/dashboard/RevenueChart";

const Dashboard = () => {
  const {
    dashboardOverview,
    monthlyRevenue,
    salesPerformance,
    dashboardLoading,
    getDashboardData,
    user
  } = useContext(AppContext);



  if (dashboardLoading) return <Loading />;

  return (
    <div className="p-4  min-h-screen space-y-10">

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <StatCard
          title="Total Leads"
          value={dashboardOverview?.leads?.total || 0}
          icon={<Users size={22} />}
        />

        <StatCard
          title="Total Deals"
          value={dashboardOverview?.deals?.total || 0}
          icon={<Briefcase size={22} />}
        />

        <StatCard
          title="Revenue"
          value={`₹ ${dashboardOverview?.revenue || 0}`}
          icon={<IndianRupee size={22} />}
        />
      </div>

      {/* Lead Breakdown */}
      <SectionCard title="Lead Status Breakdown">
        <BreakdownList data={dashboardOverview?.leads?.breakdown} />
      </SectionCard>

      {/* Deal Breakdown */}
      <SectionCard title="Deal Stage Breakdown">
        <BreakdownList data={dashboardOverview?.deals?.breakdown} />
      </SectionCard>

      {/* Monthly Revenue */}
      <SectionCard title="Monthly Revenue">
        <RevenueChart data={monthlyRevenue} />
      </SectionCard>

      {/* Admin Only */}
      {user?.role === "admin" && (
        <SectionCard title="Sales Performance">
          <div className="space-y-2">
            {salesPerformance?.map((item) => (
              <div
                key={item._id}
                className="flex justify-between bg-gray-50 px-4 py-2 rounded-lg"
              >
                <span>{item.salesName}</span>
                <span>₹ {item.revenue}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      )}
    </div>
  );
};

export default Dashboard;