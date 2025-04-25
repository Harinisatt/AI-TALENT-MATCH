import { Skill } from "@shared/schema";
import { formatPercent } from "@/lib/utils";

interface SkillMeterProps {
  skill: Skill;
  compact?: boolean;
}

export function SkillMeter({ skill, compact = false }: SkillMeterProps) {
  return (
    <div className={compact ? "mb-1.5" : "mb-2"}>
      <div className="flex justify-between mb-1">
        <span className={`text-slate-600 dark:text-slate-400 ${compact ? 'text-xs' : 'text-sm'}`}>
          {skill.name}
        </span>
        <span className={`font-medium text-slate-800 dark:text-slate-200 ${compact ? 'text-xs' : 'text-sm'}`}>
          {formatPercent(skill.proficiency)}
        </span>
      </div>
      <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-2.5">
        <div 
          className={`skill-bar ${skill.color} h-2.5 rounded-full transition-all duration-500`} 
          style={{ width: `${skill.proficiency}%` }}
          aria-label={`${skill.name} proficiency: ${skill.proficiency}%`}
          role="progressbar"
          aria-valuenow={skill.proficiency}
          aria-valuemin={0}
          aria-valuemax={100}
        ></div>
      </div>
    </div>
  );
}
