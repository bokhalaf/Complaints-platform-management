export class UpdateEmployeeStatusUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id, status) {
    const result = await this.repository.updateStatus(id, status);
    return result;
  }
}
