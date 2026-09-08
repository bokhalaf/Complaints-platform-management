import { AuthApi } from "data/datasources/auth.api";
import { UserModel } from "data/models/user.model";
import { ApiError } from "core/errors/api.error";
import { AuthRepository } from "logic/repositories/auth.repository";

export class AuthRepositoryImpl extends AuthRepository {
  constructor() {
    super();
    this.api = new AuthApi();
  }

async login(email, password, role) {
  try {
      const response = await this.api.login(email, password, role);

      const userData = response.data.data.user;
      const tokens = response.data.data.tokens;

      return {
        user: UserModel.fromJson(userData),
        tokens,
        role: userData.roles[0]
      };

  } catch (err) {
    if (err.response) {
      throw new ApiError(
        err.response.status,
        err.response.data?.message || "حدث خطأ"
      );
    }

    if (err.request) {
      throw new ApiError(0, "تعذر الاتصال بالخادم");
    }

    throw new ApiError(0, err.message);
  }
}

}
