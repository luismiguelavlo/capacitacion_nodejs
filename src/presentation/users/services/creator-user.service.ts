import { User } from "../../../data";

export class CreatorUserService {
  async execute(data: any) {
    try {
      const user = await User.create({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      return user;
    } catch (error) {
      throw error;
    }
  }
}
