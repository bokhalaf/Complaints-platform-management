import { ApiError } from "core/errors/api.error";
import { DerpartmentApi } from "data/datasources/department.api";
import { DepartmentModel } from "data/models/department.model";
import { DepartmentsRepository } from "logic/repositories/departments.repository";

export class DepartmentsRepositoryImpl extends DepartmentsRepository {
  constructor() {
    super();
    this.api = new DerpartmentApi();
  }

  async getDepartment() {
    try {
      const response = await this.api.getDepartment();
      console.log(response);
      return DepartmentModel.fromApiResponse(response);
    } catch (err) {
      if (err.response)
        throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");

      throw new ApiError(0, err.message);
    }
  }

  async addDepartment(name, description) {
    try {
      const response = await this.api.addDepartmnt(name, description);
      return DepartmentModel.toEntity(response.data.data);
    } catch (err) {
      if (err.response)
        throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");

      throw new ApiError(0, err.message);
    }
  }

  async updateDepartment(id, name, description) {
    try {
      const response = await this.api.updateDepartmnt(id, name, description);
      return DepartmentModel.toEntity(response.data.data);
    } catch (err) {
      if (err.response)
        throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");

      throw new ApiError(0, err.message);
    }
  }

  async deleteDepartment(id) {
    try {
      await this.api.deleteDepartmnt(id);
      return true;
    } catch (err) {
      if (err.response)
        throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");

      throw new ApiError(0, err.message);
    }
  }
}
