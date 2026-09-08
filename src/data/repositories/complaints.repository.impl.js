import { ApiError } from "core/errors/api.error";
import { ComplaintsApi } from "data/datasources/complaints.api"; 
import { ComplaintModel } from "data/models/complaints.model";
import { ComplaintsRepository } from "logic/repositories/complaint.repository";


export class ComplaintsRepositoryImpl extends ComplaintsRepository {
  constructor() {
    super();
    this.api = new ComplaintsApi();
  }

  async getAll() {
    try {
      const response = await this.api.getComplaints();
      console.log(response);
      return ComplaintModel.fromApiResponse(response);
    } catch (err) {
      if (err.response) throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");
      throw new ApiError(0, err.message);
    }
  }

  async getOne(id) {
    try {
      const response = await this.api.getComplaint(id);
      console.log(response);
      return ComplaintModel.toEntity(response.data.data);
    } catch (err) {
      if (err.response) throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");
      throw new ApiError(0, err.message);
    }
  }

  async update(id,status) {
    try {
      await this.api.updateStatusComplaints(id,status);
      return true;
    } catch (err) {
      if (err.response) throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");
      throw new ApiError(0, err.message);
    }
  }
    async addNote(id,message,type) {
    try {
     const r = await this.api.addNote(id,message,type);
     console.log(r);
      return true;
    } catch (err) {
      if (err.response) throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");
      throw new ApiError(0, err.message);
    }
  }

  async getTimeLine(id) {
    try {
      const response = await this.api.getComplaintTimeLine(id);
      return response.data.data; 
    } catch (err) {
      if (err.response) throw new ApiError(err.response.status, err.response.data?.message || "حدث خطأ");
      if (err.request) throw new ApiError(0, "تعذر الاتصال بالخادم");
      throw new ApiError(0, err.message);
    }
  }
}
