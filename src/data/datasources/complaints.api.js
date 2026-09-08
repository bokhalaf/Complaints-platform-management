import api from "core/config/axios";

export class ComplaintsApi {

  async getComplaints() {
   const role = localStorage.getItem("role");

    const endpoint = role === "admin"
    ? "/admin" : "employee";

    return await api.get(`${endpoint}/complaints`);
  }
  async getComplaint(id) {
     const role = localStorage.getItem("role");

    const endpoint = role === "admin"
    ? "/admin" : "employee";
    return await api.get(`${endpoint}/complaints/${id}`);
  }
   async getComplaintTimeLine(id) {
     const role = localStorage.getItem("role");

    const endpoint = role === "admin"
    ? "/admin" : "employee";
    return await api.get(`${endpoint}/complaints/${id}/timeline`);
  }
  async updateStatusComplaints(id,status) {
     const role = localStorage.getItem("role");

    const endpoint = role === "admin"
    ? "/admin" : "employee";
    return await api.put(`${endpoint}/complaints/${id}/status`,{status});
  }

  async addNote(id,message,type) {
     const role = localStorage.getItem("role");

    const endpoint = role === "admin"
    ? "/admin" : "employee";
    return await api.post(`${endpoint}/complaints/${id}/addMessage`,{message,type});
  }


}
