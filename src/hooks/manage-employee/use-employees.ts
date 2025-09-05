import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  EmployeeService,
  Employee,
  UserCreateRequest,
} from "@/lib/networking/services/employee.service";

// Query key
const EMPLOYEES_QUERY_KEY = ["employees"];

// Hook to get employees (for initial load)
export const useEmployees = (enabled: boolean = true) => {
  return useQuery({
    queryKey: [...EMPLOYEES_QUERY_KEY],
    queryFn: () => EmployeeService.getUsers(),
    enabled: enabled,
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook to get single employee by ID
export const useGetEmployee = (userId: number, enabled: boolean = true) => {
  return useQuery({
    queryKey: [...EMPLOYEES_QUERY_KEY, "single", userId],
    queryFn: () => EmployeeService.getUserById(userId),
    enabled: enabled && userId > 0,
    retry: 2,
    staleTime: 2 * 60 * 1000, // 2 minutes for individual user data
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Hook to search employees using dedicated search endpoint
export const useSearchEmployees = () => {
  return useMutation({
    mutationFn: ({
      userCode,
      fullName,
      role,
    }: {
      userCode?: string;
      fullName?: string;
      role?: "admin" | "staff";
    }) => EmployeeService.searchUsers(userCode, fullName, role),
    retry: 2,
  });
};

// Hook to create employee
export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (request: UserCreateRequest) =>
      EmployeeService.createEmployee(request),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEY,
      });
    },
  });
};

// Hook to update employee
export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userId,
      employee,
    }: {
      userId: number;
      employee: Partial<Employee>;
    }) => EmployeeService.updateEmployee(userId, employee),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEY,
      });
    },
  });
};

// Hook to delete employee
export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) => EmployeeService.deleteEmployee(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEY,
      });
    },
  });
};

// Hook to lock/unlock employee
export const useLockOrUnlockEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ userId, isActive }: { userId: number; isActive: boolean }) =>
      EmployeeService.lockOrUnlockEmployee(userId, isActive),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEY,
      });
    },
  });
};

// Hook to reset employee password
export const useResetEmployeePassword = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userId: number) =>
      EmployeeService.resetEmployeePassword(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEY,
      });
    },
  });
};
