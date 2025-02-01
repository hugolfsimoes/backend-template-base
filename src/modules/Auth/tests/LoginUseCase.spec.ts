import { jest } from "@jest/globals";
import { LoginUseCase } from "../useCases/LoginUseCase.js";
import { InMemoryUserRepository } from "../../User/tests/mocks/InMemoryUserRepository.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../../User/entities/User.js";
import { LoginDTO } from "../dtos/LoginDTO.js";


jest.mock("jsonwebtoken");

describe("LoginUseCase", () => {
  let userRepository: InMemoryUserRepository;
  let loginUseCase: LoginUseCase;
  let user: User;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    loginUseCase = new LoginUseCase(userRepository);

    user = new User("1", "Test User", "test@example.com", bcrypt.hashSync("123456", 10));
    userRepository.create(user);


    jest.spyOn(jwt, "sign").mockImplementation(() => "fake-jwt-token" as unknown as string);
  });

  it("Deve autenticar um usuário e retornar um token", async () => {
    const loginData: LoginDTO = { email: "test@example.com", password: "123456" };
    const token = await loginUseCase.execute(loginData);

    expect(token).toBe("fake-jwt-token");
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: user.id, email: user.email },
      "secret",
      { expiresIn: "1h" }
    );
  });

  it("Deve retornar erro se o email não existir", async () => {
    const loginData: LoginDTO = { email: "notfound@example.com", password: "123456" };

    await expect(loginUseCase.execute(loginData)).rejects.toThrow("Invalid email or password");
  });

  it("Deve retornar erro se a senha for inválida", async () => {
    const loginData: LoginDTO = { email: "test@example.com", password: "wrongpassword" };

    await expect(loginUseCase.execute(loginData)).rejects.toThrow("Invalid email or password");
  });
});
