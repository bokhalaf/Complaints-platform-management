export class GetLogUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    const log = await this.repository.getLog();
    return log;
  }
}
