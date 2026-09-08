import { AuthRepositoryImpl } from "data/repositories/auth.repository.impl";
import { LoginUseCase } from "logic/usecases/login.usecase";

export function provideLoginUseCase() {
  const repo = new AuthRepositoryImpl();
  return new LoginUseCase(repo);
}
