export class GetEmployeesUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    const employees = await this.repository.getAll();
    return employees;
  }
}
