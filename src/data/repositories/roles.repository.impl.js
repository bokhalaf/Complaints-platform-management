import { ApiError } from "core/errors/api.error";
import { RolesAndPermissionsApi } from "data/datasources/roleAndPermissions.api";
import { RoleModel } from "data/models/role.model";
import { RolesRepository } from "logic/repositories/roles.repository";

export class RolesRepositoryImpl extends RolesRepository {
  constructor() {
    super();
    this.api = new RolesAndPermissionsApi();
  }

  async getRoles() {
    try {
      const response = await this.api.getRole();
            console.log(response);

      return RoleModel.fromApiResponse(response);
    } catch (err) {
      throw new ApiError(err.response?.status || 0, err.response?.data?.message || "خطأ");
    }
  }
async addRole(name, permissions = []) {
  try {
    const response = await this.api.addRole(name, permissions);
    return RoleModel.toEntity(response.data.data);
  } catch (err) {
    throw new ApiError(
      err.response?.status || 0,
      err.response?.data?.message || "خطأ"
    );
  }
}

}
