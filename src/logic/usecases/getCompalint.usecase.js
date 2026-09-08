export class GetComplaintUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id) {
    const complaint = await this.repository.getOne(id);
    return complaint;
  }
}
