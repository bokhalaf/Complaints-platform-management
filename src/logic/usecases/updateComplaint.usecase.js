export class UpdateComplaintStatusUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id, status) {
    const result = await this.repository.update(id, status);
    return result;
  }
}
