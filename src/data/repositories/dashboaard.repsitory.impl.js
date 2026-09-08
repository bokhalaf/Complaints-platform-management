
import { DashboardApi } from "data/datasources/dashborad.api";
import { DashboardModel } from "../models/dashboard.model";
import { ApiError } from "core/errors/api.error";
import { DashboardRepository } from "logic/repositories/dashboard.repository";

export class DashboardRepositoryImpl extends DashboardRepository {
  constructor() {
    super();
    this.api = new DashboardApi();
  }

  async getDashboard() {
    try {
      const response = await this.api.getDashboard();
      console.log(response);
return DashboardModel.fromJson(response.data.data);
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
  async exportPDF() {
  try {
    const response = await this.api.getpdf(); 
    return response; 
  } catch (err) {
    if (err.response) throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
    if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");
    throw new ApiError(0, err.message);
  }
}
  async getLog () {
  try {
    const response = await this.api.getLog(); 
    return response; 
  } catch (err) {
    if (err.response) throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
    if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");
    throw new ApiError(0, err.message);
  }
}

}
