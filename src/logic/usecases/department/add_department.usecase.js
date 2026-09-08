export class AddDepartmentUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(name, description) {
    return await this.repository.addDepartment(name, description);
  }
}
