export class ComplaintEntity {
  constructor(
    id,
    user_id,
    type,
    department_id,
    description,
    location_text,
    status,
    handled_by,
    tracking_number,
    created_at,
    updated_at,
    user = null ,
    files = []
  ) {
    this.id = id;
    this.user_id = user_id;
    this.type = type;
    this.department_id = department_id;
    this.description = description;
    this.location_text = location_text;
    this.status = status;
    this.handled_by = handled_by;
    this.tracking_number = tracking_number;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user = user;
    this.files = files;
  }
}
