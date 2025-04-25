import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Candidate } from "@shared/schema";
import { FilterOptions, PaginationState, SortOptions } from "@/types";

export function useCandidates() {
  // Filter and sort state
  const [filters, setFilters] = useState<FilterOptions>({
    search: "",
    matchScore: "",
    status: "all"
  });
  
  const [sort, setSort] = useState<SortOptions>({
    field: "matchScore",
    direction: "desc"
  });
  
  // Pagination state
  const [pagination, setPagination] = useState<PaginationState>({
    page: 1,
    pageSize: 10,
    total: 0
  });

  // Build query param string based on filters
  const buildQueryParams = () => {
    const params = new URLSearchParams();
    
    if (filters.search) {
      params.append('search', filters.search);
    }
    
    if (filters.matchScore && filters.matchScore !== 'all') {
      params.append('matchScore', filters.matchScore);
    }
    
    if (filters.status && filters.status !== 'all') {
      params.append('status', filters.status);
    }
    
    return params.toString();
  };
  
  // Query string for API
  const queryString = buildQueryParams();
  const queryUrl = `/api/candidates${queryString ? `?${queryString}` : ''}`;
  
  // Fetch candidates
  const candidatesQuery = useQuery({
    queryKey: [queryUrl],
  });
  
  // Get candidates with applied sorting and pagination
  const getCandidates = (): Candidate[] => {
    if (!candidatesQuery.data) return [];
    
    let candidates = [...(candidatesQuery.data as Candidate[])];
    
    // Apply sorting
    candidates.sort((a, b) => {
      if (sort.field === 'matchScore') {
        return sort.direction === 'desc' 
          ? b.matchScore - a.matchScore 
          : a.matchScore - b.matchScore;
      }
      return 0;
    });
    
    // Update total count for pagination
    if (pagination.total !== candidates.length) {
      setPagination(prev => ({ ...prev, total: candidates.length }));
    }
    
    // Apply pagination
    const start = (pagination.page - 1) * pagination.pageSize;
    const end = start + pagination.pageSize;
    
    return candidates.slice(start, end);
  };
  
  // Update filters
  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    // Reset pagination when filters change
    setPagination(prev => ({ ...prev, page: 1 }));
  };
  
  // Update sort
  const updateSort = (newSort: Partial<SortOptions>) => {
    setSort(prev => ({ ...prev, ...newSort }));
  };
  
  // Update pagination
  const updatePagination = (newPagination: Partial<PaginationState>) => {
    setPagination(prev => ({ ...prev, ...newPagination }));
  };
  
  // Get single candidate by ID
  const getCandidate = (id: number): Candidate | undefined => {
    if (!candidatesQuery.data) return undefined;
    return (candidatesQuery.data as Candidate[]).find(c => c.id === id);
  };

  return {
    candidates: getCandidates(),
    allCandidates: candidatesQuery.data as Candidate[],
    isLoading: candidatesQuery.isLoading,
    filters,
    updateFilters,
    sort,
    updateSort,
    pagination,
    updatePagination,
    getCandidate,
    refetch: candidatesQuery.refetch
  };
}
