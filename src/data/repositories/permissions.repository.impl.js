import { ApiError } from "core/errors/api.error";
import { RolesAndPermissionsApi } from "data/datasources/roleAndPermissions.api";
import { PermissionModel } from "data/models/permission.model";
import { PermissionsRepository } from "logic/repositories/permissions.repository";

export class PermissionsRepositoryImpl extends PermissionsRepository {
  constructor() {
    super();
    this.api = new RolesAndPermissionsApi();
  }

  async getPermission() {
    try {
      const response = await this.api.getPermissions();
      return PermissionModel.fromApiResponse(response);
    } catch (err) {
      throw new ApiError(err.response?.status || 0, err.response?.data?.message || "خطأ");
    }
  }

  async addPermission(name) {
    try {
      const response = await this.api.addPermissions(name);
      return PermissionModel.toEntity(response.data.data);
    } catch (err) {
      throw new ApiError(err.response?.status || 0, err.response?.data?.message || "خطأ");
    }
  }
}
