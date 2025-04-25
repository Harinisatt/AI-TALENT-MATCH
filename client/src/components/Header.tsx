import { Button } from "@/components/ui/button";
import { MoonIcon, SunIcon, BellIcon, HelpCircleIcon } from "lucide-react";
import { useTheme } from "@/components/ui/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BrainCircuit } from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();
  
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-white dark:bg-slate-900 shadow-sm border-b border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
            <BrainCircuit className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            TalentMatch<span className="text-secondary">AI</span>
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme} 
            className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
          >
            <BellIcon className="h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-primary"
          >
            <HelpCircleIcon className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center space-x-2">
            <span className="text-slate-700 dark:text-slate-300 hidden md:inline-block">
              Emma Rodriguez
            </span>
            <Avatar>
              <AvatarFallback className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                ER
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
}
