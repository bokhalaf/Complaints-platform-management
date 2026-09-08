export class addEmployeeUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(name,email,password,departmentID,role) {
    const add = await this.repository.add(name,email,password,departmentID,role);
    return add;
  }
}
