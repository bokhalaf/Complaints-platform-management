import { UserEntity } from "logic/entities/user.entity";

export class UserModel {
  static fromJson(json) {
    return new UserEntity(
      json.id,
      json.name,
      json.email,
      json.roles || []
    );
  }
}
