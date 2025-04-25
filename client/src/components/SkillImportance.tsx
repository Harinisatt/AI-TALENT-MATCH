import { useState } from "react";
import { Skill } from "@shared/schema";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { importanceToText } from "@/lib/utils";

interface SkillImportanceProps {
  skill: Skill;
  onChange: (value: number) => void;
}

export function SkillImportance({ skill, onChange }: SkillImportanceProps) {
  const [importance, setImportance] = useState(skill.importance || 3);
  
  const handleChange = (value: number[]) => {
    const newValue = value[0];
    setImportance(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <div className="flex justify-between mb-1">
        <Label className="text-sm text-slate-700 dark:text-slate-300">
          {skill.name}
        </Label>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          {importanceToText(importance)}
        </span>
      </div>
      <Slider
        value={[importance]}
        min={1}
        max={5}
        step={1}
        className="w-full"
        onValueChange={handleChange}
      />
    </div>
  );
}
