export class GetDashboardUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    const dashboard = await this.repository.getDashboard();
    return dashboard;
  }
}
