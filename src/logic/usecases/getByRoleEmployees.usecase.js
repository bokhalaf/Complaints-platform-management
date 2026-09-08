export class GetByRoleEmployeesUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(role) {
    const employees = await this.repository.getByRole(role);
    return employees;
  }
}
