import api from "core/config/axios";

export class AuthApi {

  async login(email, password, role) {
    const endpoint = role === "admin"
      ? "/admin/login"
      : "/employee/login";

    return await api.post(endpoint, { email, password });
  }

}
