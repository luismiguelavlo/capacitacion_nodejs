export interface CreateUserData {
  name: string;
  email: string;
  password: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface UserValidatorInterface {
  validate(data: CreateUserData): Promise<ValidationResult>;
}
