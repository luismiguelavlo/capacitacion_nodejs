import {
  UserValidatorInterface,
  CreateUserData,
  ValidationResult,
} from "../../../domain/interfaces/user-validator.interface";

export class UserValidatorService implements UserValidatorInterface {
  async validate(data: CreateUserData): Promise<ValidationResult> {
    const errors: string[] = [];

    // Validate name
    if (!data.name || data.name.trim().length === 0) {
      errors.push("Name is required");
    } else if (data.name.trim().length < 2) {
      errors.push("Name must be at least 2 characters long");
    } else if (data.name.trim().length > 100) {
      errors.push("Name must not exceed 100 characters");
    }

    // Validate email
    if (!data.email || data.email.trim().length === 0) {
      errors.push("Email is required");
    } else if (!this.isValidEmail(data.email)) {
      errors.push("Email format is invalid");
    } else if (data.email.length > 100) {
      errors.push("Email must not exceed 100 characters");
    }

    // Validate password
    if (!data.password || data.password.length === 0) {
      errors.push("Password is required");
    } else if (data.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    } else if (data.password.length > 255) {
      errors.push("Password must not exceed 255 characters");
    } else if (!this.isValidPassword(data.password)) {
      errors.push(
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      );
    }

    return {
      isValid: errors.length === 0,
      errors: errors,
    };
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private isValidPassword(password: string): boolean {
    // At least one uppercase, one lowercase, and one number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return passwordRegex.test(password);
  }
}
