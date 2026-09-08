export class GetDepartmentsUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    return await this.repository.getDepartment();
  }
}
