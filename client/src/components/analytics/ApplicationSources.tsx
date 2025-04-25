import React from "react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip,
  Sector
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SourceData {
  name: string;
  value: number;
  icon: string;
}

// Sample data - This would be replaced with real data from API
const data: SourceData[] = [
  { name: "LinkedIn", value: 78, icon: "🔗" },
  { name: "Company Website", value: 45, icon: "🏢" },
  { name: "Job Boards", value: 38, icon: "🌐" },
  { name: "Referrals", value: 32, icon: "👥" },
  { name: "Recruiting Events", value: 7, icon: "📅" }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

interface ActiveShapeProps {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: SourceData;
  percent: number;
  value: number;
}

const renderActiveShape = (props: ActiveShapeProps) => {
  const { 
    cx, cy, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value
  } = props;

  return (
    <g>
      <text x={cx} y={cy} dy={-20} textAnchor="middle" fill="#333" className="text-lg font-bold">
        {payload.icon}
      </text>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill="#333" className="text-base">
        {payload.name}
      </text>
      <text x={cx} y={cy} dy={30} textAnchor="middle" fill="#999" className="text-sm">
        {`${value} candidates (${(percent * 100).toFixed(1)}%)`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={innerRadius - 6}
        outerRadius={innerRadius - 2}
        fill={fill}
      />
    </g>
  );
};

export function ApplicationSources() {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  const calculateTotal = () => {
    return data.reduce((sum, source) => sum + source.value, 0);
  };

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <span className="mr-2">📊</span> Application Sources
        </CardTitle>
        <CardDescription>
          Where our {calculateTotal()} candidates are coming from
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                dataKey="value"
                onMouseEnter={onPieEnter}
                paddingAngle={2}
                animationDuration={1000}
                animationBegin={200}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend 
                layout="horizontal" 
                verticalAlign="bottom" 
                align="center"
                formatter={(value, entry, index) => (
                  <span style={{ color: '#333', fontWeight: 500 }}>
                    {data[index].icon} {value}
                  </span>
                )}
              />
              <Tooltip 
                formatter={(value, name, props) => [`${value} candidates`, name]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-slate-500 italic">
          * Hover over segments for more details
        </div>
      </CardContent>
    </Card>
  );
}