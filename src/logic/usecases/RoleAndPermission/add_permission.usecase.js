export class AddPermissionUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(name) {
    return await this.repository.addPermission(name);
  }
}
