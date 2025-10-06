import { User } from "../../../data";
import { CreateUserData } from "../../../domain/interfaces/user-validator.interface";
import { UserValidatorInterface } from "../../../domain/interfaces/user-validator.interface";
import { PasswordHasherInterface } from "../../../domain/interfaces/password-hasher.interface";
import { CustomError } from "../../../domain/errors/custom.error";

export class CreatorUserService {
  constructor(
    private readonly userValidator: UserValidatorInterface,
    private readonly passwordHasher: PasswordHasherInterface
  ) {}

  async execute(data: CreateUserData): Promise<User> {
    try {
      // Validate user data
      const validation = await this.userValidator.validate(data);
      if (!validation.isValid) {
        throw CustomError.badRequest(validation.errors.join(", "));
      }

      // Check if user already exists
      const existingUser = await User.findOne({
        where: { email: data.email.trim().toLowerCase() },
      });

      if (existingUser) {
        throw CustomError.conflict("User with this email already exists");
      }

      // Hash password
      const hashedPassword = await this.passwordHasher.hash(data.password);

      // Create user
      const user = await User.create({
        name: data.name.trim(),
        email: data.email.trim().toLowerCase(),
        password: hashedPassword,
      });

      // Return user without password
      const { password, ...userWithoutPassword } = user.toJSON();
      return userWithoutPassword as User;
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.internalServer("Error creating user");
    }
  }
}
