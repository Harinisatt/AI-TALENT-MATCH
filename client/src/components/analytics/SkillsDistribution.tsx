import React from "react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer,
  Tooltip,
  Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Sample data - This would be replaced with real data from API
const data = [
  { skill: "Python", top: 90, average: 70, minimum: 40, icon: "🐍" },
  { skill: "TensorFlow", top: 85, average: 60, minimum: 35, icon: "🧠" },
  { skill: "SQL", top: 80, average: 65, minimum: 45, icon: "🗃️" },
  { skill: "Cloud Services", top: 85, average: 60, minimum: 30, icon: "☁️" },
  { skill: "Data Pipelines", top: 90, average: 55, minimum: 25, icon: "🔄" },
  { skill: "LLMs", top: 95, average: 50, minimum: 20, icon: "🤖" },
  { skill: "Prompt Engineering", top: 90, average: 45, minimum: 15, icon: "✏️" },
  { skill: "Agent Architecture", top: 85, average: 40, minimum: 10, icon: "🧩" }
];

export function SkillsDistribution() {
  return (
    <Card className="shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold flex items-center">
          <span className="mr-2">🧠</span> Candidate Skills Distribution
        </CardTitle>
        <CardDescription>
          Comparison of top, average, and minimum candidate skills
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius={120} data={data}>
              <PolarGrid gridType="polygon" />
              <PolarAngleAxis 
                dataKey="skill"
                tick={(props) => {
                  const { x, y, cx, cy, payload, index } = props;
                  const sin = Math.sin(-props.angle * Math.PI / 180);
                  const cos = Math.cos(-props.angle * Math.PI / 180);
                  const sx = cx + (140) * cos;
                  const sy = cy + (140) * sin;
                  const mx = cx + (133) * cos;
                  const my = cy + (133) * sin;
                  const skill = payload.value;
                  const matchedItem = data.find(item => item.skill === skill);
                  const icon = matchedItem?.icon || "";
                  
                  return (
                    <g>
                      <text 
                        x={sx} 
                        y={sy} 
                        textAnchor={cos >= 0 ? 'start' : 'end'} 
                        dominantBaseline="central"
                        fill="#666"
                        fontWeight="500"
                        fontSize={12}
                      >
                        {icon} {skill}
                      </text>
                      <line x1={cx} y1={cy} x2={mx} y2={my} stroke="#ccc" strokeWidth={1} strokeDasharray="1 3" />
                    </g>
                  );
                }}
              />
              <PolarRadiusAxis domain={[0, 100]} tickCount={5} angle={30} />
              <Radar 
                name="Top Candidates" 
                dataKey="top" 
                stroke="#8884d8" 
                fill="#8884d8" 
                fillOpacity={0.5} 
                animationDuration={1500}
                animationBegin={200}
              />
              <Radar 
                name="Average Candidates" 
                dataKey="average" 
                stroke="#82ca9d" 
                fill="#82ca9d" 
                fillOpacity={0.5} 
                animationDuration={1500} 
                animationBegin={500}
              />
              <Radar 
                name="Minimum Requirements" 
                dataKey="minimum" 
                stroke="#ff8042" 
                fill="#ff8042" 
                fillOpacity={0.5} 
                animationDuration={1500}
                animationBegin={800}
              />
              <Tooltip 
                formatter={(value, name, props) => [`${value}%`, name]}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                iconSize={10}
                wrapperStyle={{
                  fontSize: "12px",
                  paddingTop: "10px"
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2 text-xs text-slate-500 italic text-center">
          Skills scored on a scale of 0-100 based on resume analysis and assessments
        </div>
      </CardContent>
    </Card>
  );
}