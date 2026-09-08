import api from "core/config/axios";
import qs from "qs";

export class RolesAndPermissionsApi {
  async getRole() {
    return await api.get("/admin/roles");
  }
  async addRole(name, permissions = []) {
    const payload = {
      name,
      permissions,
    };

    return await api.post(
      "/admin/roles-with-permissions",
      qs.stringify(payload, { arrayFormat: "brackets" }), 
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  }

    async getPermissions() {
    return await api.get("/admin/permissions");
  }
    async addPermissions(name) {
    return await api.post("/admin/permissions",{name });
  }

  

 
}
