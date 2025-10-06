import bcrypt from "bcrypt";
import { PasswordHasherInterface } from "../../../domain/interfaces/password-hasher.interface";

export class PasswordHasherService implements PasswordHasherInterface {
  private readonly saltRounds: number = 12;

  async hash(password: string): Promise<string> {
    try {
      return await bcrypt.hash(password, this.saltRounds);
    } catch (error) {
      throw new Error("Error hashing password");
    }
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
      throw new Error("Error comparing password");
    }
  }
}
