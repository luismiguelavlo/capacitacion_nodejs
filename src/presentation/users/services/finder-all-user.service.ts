import { User } from "../../../data";

export class FinderAllUserService {
  async execute() {
    try {
      return await User.findAll({
        where: {
          isActive: true,
        },
        attributes: {
          exclude: ["password"],
        },
      });
    } catch (error) {
      throw error;
    }
  }
}
