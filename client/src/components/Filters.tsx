import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal } from "lucide-react";
import { FilterOptions } from "@/types";

interface FiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

export function Filters({ filters, onFilterChange }: FiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search);
  
  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchValue !== filters.search) {
        onFilterChange({ search: searchValue });
      }
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchValue, filters.search, onFilterChange]);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 mb-6">
      <div className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-4 w-4 text-slate-400" />
              </div>
              <Input
                type="search"
                className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                placeholder="Search candidates by name, skills, or keywords"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            <div className="relative">
              <Select
                value={filters.matchScore}
                onValueChange={(value) => onFilterChange({ matchScore: value })}
              >
                <SelectTrigger className="w-full md:w-[180px] bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <SelectValue placeholder="Match Score" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Scores</SelectItem>
                    <SelectItem value="high">90% and above</SelectItem>
                    <SelectItem value="medium">70% - 89%</SelectItem>
                    <SelectItem value="low">Below 70%</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400"
            >
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          <Button
            variant={filters.status === "all" ? "secondary" : "outline"}
            size="sm"
            className={filters.status === "all" 
              ? "bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 border-transparent"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}
            onClick={() => onFilterChange({ status: "all" })}
          >
            All Candidates
          </Button>
          
          <Button
            variant={filters.status === "shortlisted" ? "secondary" : "outline"}
            size="sm"
            className={filters.status === "shortlisted" 
              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 border-transparent"
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}
            onClick={() => onFilterChange({ status: "shortlisted" })}
          >
            Shortlisted
          </Button>
          
          <Button
            variant={filters.status === "interviewed" ? "secondary" : "outline"}
            size="sm"
            className={filters.status === "interviewed" 
              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 border-transparent" 
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}
            onClick={() => onFilterChange({ status: "interviewed" })}
          >
            Interviewed
          </Button>
          
          <Button
            variant={filters.status === "hired" ? "secondary" : "outline"}
            size="sm"
            className={filters.status === "hired" 
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border-transparent" 
              : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"}
            onClick={() => onFilterChange({ status: "hired" })}
          >
            Hired
          </Button>
        </div>
      </div>
    </div>
  );
}
