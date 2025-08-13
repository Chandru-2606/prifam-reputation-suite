import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

interface ReviewsChartProps {
  data: Array<{
    month: string;
    reviews: number;
    platform?: string;
  }>;
  title?: string;
}

export function ReviewsChart({ data, title = "Reviews Over Time" }: ReviewsChartProps) {
  return (
    <div className="w-full h-80">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis 
            dataKey="month" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip 
            formatter={(value) => [value, "Reviews"]}
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "var(--radius)",
            }}
          />
          <Legend />
          <Bar 
            dataKey="reviews" 
            fill="hsl(var(--primary))" 
            radius={[4, 4, 0, 0]}
            name="Total Reviews"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}