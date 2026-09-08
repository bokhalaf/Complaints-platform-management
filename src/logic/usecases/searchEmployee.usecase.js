export class SearchEmployeeUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(query) {
    const employee = await this.repository.search(query);
    return employee;
  }
}
