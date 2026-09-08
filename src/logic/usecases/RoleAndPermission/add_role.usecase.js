export class AddRoleUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(name, permissions = []) {
    return await this.repository.addRole(name, permissions);
  }
}
