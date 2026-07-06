import MainLayout from "../../layouts/MainLayout";
import StatCard from "../../components/cards/StatCard";
import PieChartCard from "../../components/charts/PieChartCard";
import BarChartCard from "../../components/charts/BarChartCard";
import RecentTransactionsTable from "../../components/tables/RecentTransactionsTable";
import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

import {
  FiBox,
  FiAlertTriangle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";

function Dashboard() {


  const navigate = useNavigate();

 const [dashboardData, setDashboardData] = useState({

  totalComponents: 0,

  lowStock: 0,

  mostUsedComponent: "",

  recentlyAdded: 0,

  categoryDistribution: [],

  topUsedComponents: []

});

  const fetchDashboard = async () => {
    try {

      const response = await getDashboard();

      setDashboardData(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  useEffect(() => {

    fetchDashboard();

  }, []);

  return (
    <MainLayout>

      <h1 className="text-3xl font-bold text-slate-800 mb-8">
      
      </h1>

      {/* Cards */}

      <div
        className="
        grid
        grid-cols-1
        md:grid-cols-2
        xl:grid-cols-4
        gap-6
        "
      >

        <div onClick={() => navigate("/components")}>

  <StatCard
    title="Total Components"
    value={dashboardData.totalComponents}
    icon={<FiBox />}
    color="bg-blue-600"
  />

</div>
        

        <div onClick={() => navigate("/low-stock")}>

  <StatCard
    title="Low Stock"
    value={dashboardData.lowStock}
    icon={<FiAlertTriangle />}
    color="bg-red-500"
  />

</div>

        <StatCard
          title="Recently Added"
          value={dashboardData.recentlyAdded}
          icon={<FiClock />}
          color="bg-green-500"
        />

        <StatCard
          title="Most Used"
          value={dashboardData.mostUsedComponent}
          icon={<FiTrendingUp />}
          color="bg-purple-500"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mt-8">

        <PieChartCard
          categoryDistribution={dashboardData.categoryDistribution}
        />

        
        <BarChartCard
  topUsedComponents={
    dashboardData.topUsedComponents
  }
/>

      </div>

      {/* Recent Transactions */}

      <div className="mt-8">

        <RecentTransactionsTable />

      </div>

    </MainLayout>
  );
}

export default Dashboard;