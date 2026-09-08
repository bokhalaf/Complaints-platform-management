export class EmployeeEntity {
  constructor(id, name, email, department_id, status,role) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.role = role;

    this.department_id = department_id; 
    this.status= status;
  }
}
