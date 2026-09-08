import api from "core/config/axios";

export class DashboardApi {
  async getDashboard() {
    return await api.get("/admin/dashboard");
  }
    async getpdf() {
    return await api.get("/admin/export/pdf",{
    responseType: "blob" 
  });
  }
  async getLog() {
    return await api.get("/admin/audit-logs");
  }
}
