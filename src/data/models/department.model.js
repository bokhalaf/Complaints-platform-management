import { DepartmentEntity } from "logic/entities/department.entity";

export class DepartmentModel {
  static toEntity(json) {
    return new DepartmentEntity(
      json.id,
      json.name,
      json.description,
      json.created_at,
      json.updated_at
    );
  }

  static toEntityArray(jsonArray) {
    return jsonArray.map(DepartmentModel.toEntity);
  }

  static fromApiResponse(response) {
    return DepartmentModel.toEntityArray(response.data.data);
  }
}
