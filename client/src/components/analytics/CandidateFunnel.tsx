import React from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LabelList 
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type StageIconsType = {
  [key: string]: string;
};

const stageIcons: StageIconsType = {
  "Applied": "📄",
  "Screened": "🔍",
  "Interviewed": "🗣️",
  "Offered": "🤝",
  "Hired": "👤✅"
};

interface FunnelDataItem {
  stage: string;
  count: number;
  color: string;
  rate?: string;
}

// Sample data - This would be replaced with real data from API
const data: FunnelDataItem[] = [
  { stage: "Applied", count: 200, color: "#4a6fa0" },
  { stage: "Screened", count: 120, color: "#38598b" },
  { stage: "Interviewed", count: 65, color: "#274472" },
  { stage: "Offered", count: 30, color: "#152a4d" },
  { stage: "Hired", count: 22, color: "#0a1a33" }
];

// Calculate conversion rates
const dataWithRates: FunnelDataItem[] = data.map((item, index) => {
  if (index === 0) return { ...item, rate: "100%" };
  const rate = ((item.count / data[index - 1].count) * 100).toFixed(1);
  return { ...item, rate: `${rate}%` };
});

export function CandidateFunnel() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <span className="mr-2">👥</span> Candidate Progress Funnel
        </CardTitle>
        <CardDescription>
          Tracking candidates through hiring pipeline stages
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[340px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={dataWithRates}
              layout="vertical"
              barGap={0}
              barCategoryGap={15}
              margin={{ top: 15, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
              <XAxis type="number" domain={[0, 'dataMax']} />
              <YAxis 
                type="category" 
                dataKey="stage" 
                tickLine={false}
                tick={(props: any) => {
                  const { x, y, payload } = props;
                  const stage = payload.value as string;
                  const icon = stageIcons[stage] || "";
                  
                  return (
                    <g transform={`translate(${x},${y})`}>
                      <text x={-10} y={4} textAnchor="end" fill="#666" fontWeight="500">
                        {icon} {stage}
                      </text>
                    </g>
                  );
                }}
              />
              <Tooltip
                formatter={(value, name, props) => {
                  if (name === "count") return [`${value} candidates`, "Count"];
                  return [value, name];
                }}
                labelFormatter={(label) => `Stage: ${label}`}
              />
              <Bar 
                dataKey="count" 
                fill="#8884d8" 
                radius={[0, 4, 4, 0]}
                animationDuration={1500}
                barSize={30}
                label={{ 
                  position: 'right', 
                  formatter: (item: any) => item.count,
                  fill: "#555",
                  fontWeight: "600"
                }}
                background={{ fill: '#eee' }}
              >
                {dataWithRates.map((entry, index) => (
                  <LabelList 
                    key={`label-${index}`}
                    dataKey="rate" 
                    position="right" 
                    offset={60}
                    fill="#666"
                    fontSize={12}
                  />
                ))}
                {dataWithRates.map((entry, index) => (
                  <Bar key={`bar-${index}`} dataKey="count" fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 text-xs text-slate-500 italic">
          * Percentages show conversion rates between stages
        </div>
      </CardContent>
    </Card>
  );
}