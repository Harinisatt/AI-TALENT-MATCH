import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  ReferenceLine,
  Cell 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Sample data - This would be replaced with real data from API
const data = [
  { role: "Data Engineer", days: 35, icon: "💾" },
  { role: "ML Engineer", days: 42, icon: "🧠" },
  { role: "Data Scientist", days: 38, icon: "📊" },
  { role: "LLM Engineer", days: 48, icon: "🤖" },
  { role: "AI Research", days: 55, icon: "🔬" },
  { role: "GenAI Developer", days: 45, icon: "✨" }
];

const average = data.reduce((acc, item) => acc + item.days, 0) / data.length;

const getBarColor = (value: number): string => {
  if (value <= 35) return "#4caf50"; // Green - fast
  if (value <= 45) return "#ff9800"; // Orange - medium
  return "#f44336"; // Red - slow
};

export function TimeToHire() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <span className="mr-2">⏱️</span> Time to Hire
        </CardTitle>
        <CardDescription>
          Average days from application to hire by role
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis 
                type="number" 
                domain={[0, 'dataMax']} 
                label={{ 
                  value: 'Days', 
                  position: 'insideBottom', 
                  offset: -5 
                }} 
              />
              <YAxis 
                type="category" 
                dataKey="role" 
                tickLine={false}
                width={100}
                tick={(props) => {
                  const { x, y, payload } = props;
                  const role = payload.value;
                  const matchedItem = data.find(item => item.role === role);
                  const icon = matchedItem?.icon || "";
                  
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text x={-5} y={4} textAnchor="end" fill="#666" fontWeight="500">
                        {icon} {role}
                      </text>
                    </g>
                  );
                }}
              />
              <ReferenceLine
                x={average}
                stroke="#666"
                strokeDasharray="3 3"
                label={{
                  value: `Avg: ${average.toFixed(1)} days`,
                  fill: "#666",
                  fontSize: 12,
                  position: "insideBottomRight"
                }}
              />
              <Tooltip
                formatter={(value, name, props) => [`${value} days`, 'Time to Hire']}
                labelFormatter={(label) => `Role: ${label}`}
              />
              <Bar 
                dataKey="days" 
                barSize={20}
                radius={[0, 4, 4, 0]}
                label={{ 
                  position: 'right', 
                  formatter: (item: any) => `${item.days} days`,
                  fill: "#555",
                  fontSize: 12
                }}
                animationDuration={1500}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getBarColor(entry.days)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 flex justify-between text-xs text-slate-500">
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-green-500 mr-1"></span> Fast
          </span>
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-orange-500 mr-1"></span> Average
          </span>
          <span className="flex items-center">
            <span className="inline-block w-3 h-3 rounded-full bg-red-500 mr-1"></span> Slow
          </span>
        </div>
      </CardContent>
    </Card>
  );
}