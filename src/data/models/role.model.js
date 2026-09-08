import { RoleEntity } from "logic/entities/role.entity";

export class RoleModel {
  static toEntity(json) {
    return new RoleEntity(
      json.id,
      json.name,
      json.guard_name,
      json.created_at,
      json.updated_at,
      json.permissions
    );
  }

  static toArray(jsonArray) {
    return jsonArray.map(RoleModel.toEntity);
  }

  static fromApiResponse(response) {
    return RoleModel.toArray(response.data.data);
  }
}
