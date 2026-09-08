import { ComplaintEntity } from "logic/entities/complaint.entity";
import { EmployeeEntity } from "logic/entities/emplyee.entity"; // المستخدم المرتبط

export class ComplaintModel {
static toEntity(json) {
  const userEntity = json.user
    ? new EmployeeEntity(
        json.user.id,
        json.user.name,
        json.user.email,
        json.user.department_id,
        json.user.status
      )
    : null;

  const files = (json.files || []).map(f => ({
    id: f.id,
    file_path: f.file_path,
    file_type: f.file_type,
    created_at: f.created_at,
    updated_at: f.updated_at,
  }));

  return new ComplaintEntity(
    json.id,
    json.user_id,
    json.type,
    json.department_id,
    json.description,
    json.location_text,
    json.status,
    json.handled_by,
    json.tracking_number,
    json.created_at,
    json.updated_at,
    userEntity,
    files
  );
}

  static toEntityArray(jsonArray) {
    return jsonArray.map(ComplaintModel.toEntity);
  }

  static fromApiResponse(response) {
    return ComplaintModel.toEntityArray(response.data.data);
  }
}
