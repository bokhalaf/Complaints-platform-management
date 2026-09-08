export class ExportPDFUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute() {
    const file = await this.repository.exportPDF();
    return file;
  }
}
