export class UpdateDepartmentUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id, name, description) {
    return await this.repository.updateDepartment(id, name, description);
  }
}
