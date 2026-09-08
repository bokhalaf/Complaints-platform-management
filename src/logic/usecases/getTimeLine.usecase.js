export class GetComplaintTimeLineUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id) {
    const timeline = await this.repository.getTimeLine(id);
    return timeline;
  }
}
