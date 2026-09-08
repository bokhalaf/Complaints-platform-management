export class RoleEntity {
  constructor(id, name, guardName, createdAt, updatedAt,permissions) {
    this.id = id;
    this.name = name;
    this.guardName = guardName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.permissions =permissions
  }
}
