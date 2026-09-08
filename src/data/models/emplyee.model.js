import { EmployeeEntity } from "logic/entities/emplyee.entity";

export class EmployeeModel {
  static toEntity(json) {
    return new EmployeeEntity(
      json.id,
      json.name,
      json.email,
      json.department_id,
      json.status,
            json.role

    );
  }

  static toEntityArray(jsonArray) {
    return jsonArray.map(EmployeeModel.toEntity);
  }

  static fromApiResponse(response) {
    return EmployeeModel.toEntityArray(response.data.data);
  }
}
