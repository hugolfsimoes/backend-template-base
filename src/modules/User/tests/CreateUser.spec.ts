import { CreateUser } from "../useCases/CreateUser.js";
import { InMemoryUserRepository } from "./mocks/InMemoryUserRepository.js";
import { User } from "../entities/User.js";

describe("CreateUser Use Case", () => {
  let userRepository: InMemoryUserRepository;
  let createUser: CreateUser;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    createUser = new CreateUser(userRepository);
  });

  it("Deve criar um novo usuário", async () => {
    const user = await createUser.execute({ name: "Test", email: "test@example.com", password: "123456" });

    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Test");
    expect(user.email).toBe("test@example.com");
  });

  it("Deve retornar erro se o e-mail já estiver cadastrado", async () => {
    await createUser.execute({ name: "Test", email: "test@example.com", password: "123456" });

    await expect(createUser.execute({ name: "Test2", email: "test@example.com", password: "654321" }))
      .rejects
      .toThrow("Email already exists");
  });
});
