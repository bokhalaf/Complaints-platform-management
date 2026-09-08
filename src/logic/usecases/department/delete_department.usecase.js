export class DeleteDepartmentUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id) {
    return await this.repository.deleteDepartment(id);
  }
}
