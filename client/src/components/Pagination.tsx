import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Don't render pagination if there's only 1 page
  if (totalPages <= 1) return null;
  
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    
    // Show max 5 page numbers
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      // Calculate middle pages
      if (currentPage <= 3) {
        pageNumbers.push(2, 3, 4);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(totalPages - 3, totalPages - 2, totalPages - 1);
      } else {
        pageNumbers.push(currentPage - 1, currentPage, currentPage + 1);
      }
      
      // Always show last page
      pageNumbers.push(totalPages);
    }
    
    // Filter out duplicates and sort
    return [...new Set(pageNumbers)].sort((a, b) => a - b);
  };
  
  const pageNumbers = getPageNumbers();

  return (
    <div className="flex space-x-1">
      <Button
        variant="outline"
        size="sm"
        className="px-3 py-1 text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        Previous
      </Button>
      
      {pageNumbers.map((page, index) => {
        // Add ellipsis
        if (index > 0 && page - pageNumbers[index - 1] > 1) {
          return (
            <span 
              key={`ellipsis-${index}`}
              className="px-3 py-1 text-sm text-slate-500 dark:text-slate-400 flex items-center"
            >
              ...
            </span>
          );
        }
        
        return (
          <Button
            key={page}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            className={currentPage === page 
              ? "px-3 py-1 text-sm bg-primary border-primary text-white" 
              : "px-3 py-1 text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        );
      })}
      
      <Button
        variant="outline"
        size="sm"
        className="px-3 py-1 text-sm bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-1" />
      </Button>
    </div>
  );
}
