import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function BarChartCard({
  topUsedComponents
}) {

  const data = topUsedComponents || [];

  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-slate-200
      p-6
      h-[400px]
      "
    >

      <h2 className="text-xl font-semibold text-slate-800 mb-6">

        Top Used Components

      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <BarChart data={data}>

          <XAxis dataKey="component" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="count"
            fill="#2563EB"
            radius={[10, 10, 0, 0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );

}

export default BarChartCard;