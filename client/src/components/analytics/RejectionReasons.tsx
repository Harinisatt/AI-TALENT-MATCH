import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Sample data - This would be replaced with real data from API
const data = [
  { reason: "Insufficient experience", count: 53, icon: "⚠️" },
  { reason: "Technical skills mismatch", count: 48, icon: "🔧" }, 
  { reason: "Salary expectations", count: 37, icon: "💰" },
  { reason: "Cultural fit concerns", count: 31, icon: "🏢" },
  { reason: "Communication skills", count: 24, icon: "🗣️" },
  { reason: "Declined offer", count: 12, icon: "❌" },
  { reason: "Location constraints", count: 9, icon: "📍" }
].sort((a, b) => b.count - a.count);

const COLORS = [
  "#e57373", "#ef5350", "#f44336", "#e53935", 
  "#d32f2f", "#c62828", "#b71c1c"
];

export function RejectionReasons() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <span className="mr-2">❌</span> Rejection Reasons
        </CardTitle>
        <CardDescription>
          Primary reasons candidates don't proceed in the process
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 40, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" />
              <YAxis 
                type="category" 
                dataKey="reason" 
                tickLine={false}
                width={140}
                tick={(props) => {
                  const { x, y, payload } = props;
                  const reason = payload.value;
                  const matchedItem = data.find(item => item.reason === reason);
                  const icon = matchedItem?.icon || "";
                  
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text x={-5} y={4} textAnchor="end" fill="#666" fontWeight="500" fontSize={12}>
                        {icon} {reason.length > 18 ? reason.substring(0, 18) + "..." : reason}
                      </text>
                    </g>
                  );
                }}
              />
              <Tooltip
                formatter={(value, name, props) => [`${value} candidates`, 'Count']}
                labelFormatter={(label) => `Reason: ${label}`}
              />
              <Bar 
                dataKey="count" 
                barSize={14}
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
                label={{ 
                  position: 'right', 
                  formatter: (item: any) => item.count,
                  fill: "#555",
                  fontSize: 12
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 text-xs text-slate-500 italic text-center">
          Based on feedback from hiring managers and recruiters
        </div>
      </CardContent>
    </Card>
  );
}