import api from "core/config/axios";

export class EmployeesApi {
  async getAllEmployees() {
    return await api.get("/admin/users");
  }
   async getByRoleEmployees(role) {
    return await api.get("/admin/users",{    params: { role }
});
  }
    async addEmployee(name,email,password,departmentID,role) {
    return await api.post("/admin/users", {name,email,password,department_id:departmentID,role});
  }
   async deleteEmployee(id) {
    return await api.delete(`/admin/users/${id}`);
  }
   async editEmployee(id, name, email, departmentID,password, role) {
  const data = {};
  if (departmentID) data.departmentID = departmentID;

  if (name) data.name = name;
  if (email) data.email = email;
  if (password) data.password = password;
  if (role) data.role = role;

  return await api.put(`/admin/users/${id}`, data);
}

   async updateStatusEmployee(id,status) {
    return await api.patch(`/admin/users/${id}/status`,{status});
  }
  async searchEmployee(query) {
  return await api.get("/admin/user/search", {
    params: { query }
  });
}

}
