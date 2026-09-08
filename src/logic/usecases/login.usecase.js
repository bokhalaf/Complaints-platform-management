export class LoginUseCase {
  constructor(repository) {
    this.repository = repository;
  }

  async execute(email, password, role) {
    return await this.repository.login(email, password, role);
  }
}
