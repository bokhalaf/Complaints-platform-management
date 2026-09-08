export class GetPermissionsUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    return await this.repository.getPermission();
  }
}
