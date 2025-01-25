import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";

export class User {
  constructor(
    public id: string = uuidv4(),
    public name: string,
    public email: string,
    public password: string
  ) {}

  static hashPassword(password: string): string {
    return bcrypt.hashSync(password, 10);
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.password);
  }
}
