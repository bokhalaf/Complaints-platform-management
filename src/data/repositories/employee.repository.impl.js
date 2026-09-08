
import { ApiError } from "core/errors/api.error";
import { EmployeesApi } from "data/datasources/employee.api";
import { EmployeeModel } from "data/models/emplyee.model";
import { EmployeesRepository } from "logic/repositories/employees.repository";

export class EmployeesRepositoryImpl extends EmployeesRepository {
  constructor() {
    super();
    this.api = new EmployeesApi();
  }

  async getAll() {
    try {
      const response = await this.api.getAllEmployees();
      console.log(response);
      return EmployeeModel.fromApiResponse(response); 
    } catch (err) {
      if (err.response) {
        throw new ApiError(
          err.response.status,
          err.response.data?.message || "حدث خطأ"
        );
      }
      if (err.request) {
        throw new ApiError(0, "تعذر الاتصال بالخادم");
      }
      throw new ApiError(0, err.message);
    }
  }
    async getByRole(role) {
    try {
      const response = await this.api.getByRoleEmployees(role);
      console.log(response);
      return EmployeeModel.fromApiResponse(response); 
    } catch (err) {
      if (err.response) {
        throw new ApiError(
          err.response.status,
          err.response.data?.message || "حدث خطأ"
        );
      }
      if (err.request) {
        throw new ApiError(0, "تعذر الاتصال بالخادم");
      }
      throw new ApiError(0, err.message);
    }
  }
  async add(name,email,password,departmentID,role) {
    try {
      const response = await this.api.addEmployee(
      name,email,password,departmentID,role
      );
      return EmployeeModel.toEntity(response.data.data);
    } catch (err) {
      if (err.response) throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");
      throw new ApiError(0, err.message);
    }
  }
  async delete(id) {
    try {
      await this.api.deleteEmployee(id);
      return true;
    } catch (err) {
      if (err.response) {
        throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      }
      if (err.request) {
        throw new ApiError(0, "تعذر الاتصال بالخادم");
      }
      throw new ApiError(0, err.message);
    }
  }
   async edit(id,name,email,departmentID,password,role) {
    try {
      await this.api.editEmployee(id,name,email,departmentID,password,role);
      return true;
    } catch (err) {
      if (err.response) {
        throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      }
      if (err.request) {
        throw new ApiError(0, "تعذر الاتصال بالخادم");
      }
      throw new ApiError(0, err.message);
    }
  }
  async updateStatus(id,status) {
    try {
      const response = await this.api.updateStatusEmployee(id,status);
      console.log(response);
      return true;
    } catch (err) {
      if (err.response) {
        throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      }
      if (err.request) {
        throw new ApiError(0, "تعذر الاتصال بالخادم");
      }
      throw new ApiError(0, err.message);
    }
  }
    async search(query) {
    try {
      const response = await this.api.searchEmployee(query);
      console.log(response);
      return EmployeeModel.fromApiResponse(response); 
    } catch (err) {
      if (err.response) {
        throw new ApiError(
          err.response.status,
          err.response.data?.message || "حدث خطأ"
        );
      }
    }
  }
}
