export class PermissionEntity {
  constructor(id, name, guardName, createdAt, updatedAt) {
    this.id = id;
    this.name = name;
    this.guardName = guardName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
