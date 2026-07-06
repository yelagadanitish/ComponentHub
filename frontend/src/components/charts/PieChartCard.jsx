import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";

const COLORS = [
  "#2563EB",
  "#16A34A",
  "#F59E0B",
  "#DC2626",
  "#7C3AED",
  "#0891B2",
  "#DB2777",
  "#65A30D",
  "#EA580C",
  "#0F766E",
  "#4F46E5",
  "#9333EA"
];

function PieChartCard({ categoryDistribution = [] }) {

  return (

    <div
      className="
      bg-white
      rounded-3xl
      shadow-lg
      border
      border-slate-200
      p-6
      h-[450px]
      "
    >

      <h2 className="text-2xl font-semibold text-slate-800 mb-6">
        Components by Category
      </h2>

      <ResponsiveContainer width="100%" height="90%">

        <PieChart>

          <Pie
            data={categoryDistribution}
            dataKey="value"
            nameKey="name"
            outerRadius={120}
            innerRadius={60}
            paddingAngle={3}
          >

            {categoryDistribution.map((entry, index) => (

              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />

            ))}

          </Pie>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            formatter={(value) => value}
          />

        </PieChart>

      </ResponsiveContainer>

    </div>

  );

}

export default PieChartCard;