import { BarGraph } from "@/components/dashboard/charts/BarCharts";
import { PieCharts } from "@/components/dashboard/charts/PieCharts";
import MembersCard from "@/components/dashboard/member/MembersCard";

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 pt-14">
        <div className="col-span-2">
          <BarGraph />
        </div>
        <div className="col-span-1">
          {" "}
          <PieCharts />
          <MembersCard />
        </div>
      </div>
    </div>
  );
}
