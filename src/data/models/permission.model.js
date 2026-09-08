import { PermissionEntity } from "logic/entities/permission.entity";

export class PermissionModel {
  static toEntity(json) {
    return new PermissionEntity(
      json.id,
      json.name,
      json.guard_name,
      json.created_at,
      json.updated_at
    );
  }

  static toArray(jsonArray) {
    return jsonArray.map(PermissionModel.toEntity);
  }

  static fromApiResponse(response) {
    return PermissionModel.toArray(response.data.data);
  }
}
