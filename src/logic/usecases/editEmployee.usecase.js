export class editEmployeeUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(id,name,email,password,department,role) {
    const edit = await this.repository.edit(id,name,email,password,role);
    return edit;
  }
}
