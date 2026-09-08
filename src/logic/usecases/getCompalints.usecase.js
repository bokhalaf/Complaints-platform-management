export class GetComplaintsUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    const complaints = await this.repository.getAll();
    return complaints;
  }
}
