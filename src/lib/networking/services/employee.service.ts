import { api } from "../axious";

// Types for employee management
export interface Employee {
  userId: number; // Changed from id to match UserResponse
  userCode: string;
  username: string;
  email: string;
  fullName: string;
  role: "admin" | "staff";
  isActive: boolean;
  createdAt: string;
}

export interface EmployeesResponse {
  code: number;
  message: string;
  data: Employee[];
}

// Search request to match your DTO
export interface SearchUserRequest {
  userCode?: string;
  fullName?: string;
  role?: "admin" | "staff";
}

// Create user request interface
export interface UserCreateRequest {
  username: string;
  email: string;
  fullName: string;
  role: string;
  isActive: boolean;
}

// Lock/unlock request interface
export interface UserLockRequest {
  isActive: boolean;
}

// Response for lock/unlock operations
export interface UserLockResponse {
  userId: number;
  userCode: string;
  fullName: string;
  isActive: boolean;
}

export class EmployeeService {
  private static readonly BASE_URL = "/admin";

  // Search users/employees using dedicated search endpoint
  static async searchUsers(
    userCode?: string,
    fullName?: string,
    role?: "admin" | "staff"
  ): Promise<EmployeesResponse> {
    try {
      // Using POST with request body to match your DTO
      const searchRequest: SearchUserRequest = {};

      if (userCode?.trim()) {
        searchRequest.userCode = userCode.trim();
      }
      if (fullName?.trim()) {
        searchRequest.fullName = fullName.trim();
      }
      if (role) {
        searchRequest.role = role;
      }

      const response = await api.post<EmployeesResponse>(
        `${this.BASE_URL}/search`,
        searchRequest
      );

      return response.data;
    } catch (error: unknown) {
      console.error("❌ Search users error:", error);
      throw error;
    }
  }

  // Get all users/employees (for initial load)
  static async getUsers(): Promise<EmployeesResponse> {
    try {
      const response = await api.get<EmployeesResponse>(
        `${this.BASE_URL}/getUsers`
      );

      return response.data;
    } catch (error: unknown) {
      throw error;
    }
  }

  // Get single user by ID
  static async getUserById(
    userId: number
  ): Promise<{ code: number; message: string; data: Employee }> {
    try {
      const response = await api.get<{
        code: number;
        message: string;
        data: Employee;
      }>(`${this.BASE_URL}/user/${userId}`);

      return response.data;
    } catch (error: unknown) {
      console.error("❌ Get user by ID error:", error);
      throw error;
    }
  }

  // Create new employee
  static async createEmployee(
    request: UserCreateRequest
  ): Promise<{ code: number; message: string; data: Employee }> {
    try {
      const response = await api.post<{
        code: number;
        message: string;
        data: Employee;
      }>(`${this.BASE_URL}/create`, request);

      return response.data;
    } catch (error: unknown) {
      console.error("❌ Create employee error:", error);
      throw error;
    }
  }

  // Update employee
  static async updateEmployee(
    userId: number,
    employee: Partial<Employee>
  ): Promise<{ code: number; message: string; data: Employee }> {
    try {
      const response = await api.put<{
        code: number;
        message: string;
        data: Employee;
      }>(`${this.BASE_URL}/update/${userId}`, employee);

      return response.data;
    } catch (error: unknown) {
      console.error("❌ Update employee error:", error);
      throw error;
    }
  }

  // Delete employee
  static async deleteEmployee(userId: number): Promise<EmployeesResponse> {
    try {
      const response = await api.delete<EmployeesResponse>(
        `${this.BASE_URL}/users/${userId}`
      );
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Delete employee error:", error);
      throw error;
    }
  }

  // Lock/Unlock employee account
  static async lockOrUnlockEmployee(
    userId: number,
    isActive: boolean
  ): Promise<{ code: number; message: string; data: UserLockResponse }> {
    try {
      const lockRequest: UserLockRequest = { isActive };

      const response = await api.put<{
        code: number;
        message: string;
        data: UserLockResponse;
      }>(`${this.BASE_URL}/${userId}/lock`, lockRequest);

      return response.data;
    } catch (error: unknown) {
      console.error("❌ Lock/Unlock error:", error);
      throw error;
    }
  }

  // Reset employee password
  static async resetEmployeePassword(
    userId: number
  ): Promise<EmployeesResponse> {
    try {
      const response = await api.put<EmployeesResponse>(
        `${this.BASE_URL}/${userId}/reset-password`
      );
      return response.data;
    } catch (error: unknown) {
      console.error("❌ Reset password error:", error);
      throw error;
    }
  }
}
