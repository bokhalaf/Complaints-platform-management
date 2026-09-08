import api from "core/config/axios";

export class DerpartmentApi {
  async getDepartment() {
    return await api.get("/admin/departments");
  }
    async addDepartmnt(name,description) {
    return await api.post("/admin/departments",{name , description});
  }
     async updateDepartmnt(id,name,description) {
    return await api.put(`/admin/departments/${id}`,{name , description});
  }
     async deleteDepartmnt(id) {
    return await api.delete(`/admin/departments/${id}`);
  }
  

 
}
