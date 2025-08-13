import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface SentimentChartProps {
  data: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  title?: string;
}

const COLORS = {
  positive: "hsl(var(--positive))",
  negative: "hsl(var(--negative))",
  neutral: "hsl(var(--neutral))",
};

export function SentimentChart({ data, title = "Sentiment Distribution" }: SentimentChartProps) {
  const chartData = data.map(item => ({
    ...item,
    color: COLORS[item.name.toLowerCase() as keyof typeof COLORS] || item.color
  }));

  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value) => [value, "Reviews"]}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}