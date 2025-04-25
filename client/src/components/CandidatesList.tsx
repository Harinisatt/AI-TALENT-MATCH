import { useJobRequirements } from "@/hooks/useJobRequirements";
import { useCandidates } from "@/hooks/useCandidates";
import { useComparisonDrawer } from "@/hooks/useComparisonDrawer";
import { Filters } from "./Filters";
import { CandidateCard } from "./CandidateCard";
import { Pagination } from "./Pagination";
import { Skeleton } from "@/components/ui/skeleton";

export function CandidatesList() {
  const { jobRequirement } = useJobRequirements();
  const { 
    candidates, 
    isLoading, 
    filters, 
    updateFilters,
    pagination,
    updatePagination
  } = useCandidates();
  
  const { 
    addCandidateForComparison,
    isInComparison
  } = useComparisonDrawer();

  return (
    <div>
      <Filters 
        filters={filters}
        onFilterChange={updateFilters}
      />
      
      {isLoading ? (
        <div className="space-y-6">
          <CandidateCardSkeleton />
          <CandidateCardSkeleton />
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {candidates.length === 0 ? (
              <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 text-center">
                <p className="text-slate-500 dark:text-slate-400">No candidates found matching your filters</p>
              </div>
            ) : (
              candidates.map(candidate => (
                <CandidateCard 
                  key={candidate.id}
                  candidate={candidate}
                  onAddToComparison={addCandidateForComparison}
                  isInComparison={isInComparison(candidate.id)}
                />
              ))
            )}
          </div>
          
          {candidates.length > 0 && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Showing {candidates.length} of {pagination.total} candidates
              </div>
              
              <Pagination 
                currentPage={pagination.page}
                totalPages={Math.ceil(pagination.total / pagination.pageSize)}
                onPageChange={(page) => updatePagination({ page })}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}

function CandidateCardSkeleton() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-1 p-6 flex flex-col md:border-r border-slate-100 dark:border-slate-800">
          <div className="flex items-start space-x-4 md:space-x-0 md:flex-col">
            <Skeleton className="w-16 h-16 md:w-24 md:h-24 rounded-full" />
            <div className="md:mt-4">
              <Skeleton className="h-6 w-32 mb-2" />
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
          
          <div className="mt-4 hidden md:block">
            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3 p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <Skeleton className="h-5 w-24 mb-2" />
              <Skeleton className="h-4 w-48" />
            </div>
            
            <div className="flex space-x-2">
              <Skeleton className="h-9 w-32" />
              <Skeleton className="h-9 w-24" />
            </div>
          </div>
          
          <div className="space-y-5">
            <div>
              <Skeleton className="h-4 w-24 mb-3" />
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
                <div>
                  <div className="flex justify-between mb-1">
                    <Skeleton className="h-3 w-32" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-2.5 w-full rounded-full" />
                </div>
              </div>
            </div>
            
            <div>
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-16 w-full rounded-lg" />
            </div>
            
            <div className="pt-2">
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-5 w-16 rounded-full" />
                <Skeleton className="h-5 w-20 rounded-full" />
                <Skeleton className="h-5 w-12 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-16 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
