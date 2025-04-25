import { Switch, Route, Link, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Analytics from "@/pages/Analytics";

function MainNavigation() {
  const [location] = useLocation();
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-1">
            <div className="flex items-center font-bold text-primary text-xl">
              <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center mr-2">
                <span className="text-white text-xs">WTA</span>
              </div>
              <span>AI Talent Match</span>
            </div>
            <nav className="ml-10 flex items-center space-x-4">
              <Link href="/">
                <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/" 
                    ? "bg-primary text-white" 
                    : "text-slate-600 hover:text-primary hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}>
                  <span className="mr-1">👥</span> Candidates
                </a>
              </Link>
              <Link href="/analytics">
                <a className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/analytics" 
                    ? "bg-primary text-white" 
                    : "text-slate-600 hover:text-primary hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}>
                  <span className="mr-1">📊</span> Analytics
                </a>
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}

function Router() {
  return (
    <>
      <MainNavigation />
      <div className="pt-16">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/analytics" component={Analytics} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
