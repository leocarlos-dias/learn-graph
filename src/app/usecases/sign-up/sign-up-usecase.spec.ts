import { UserRepository } from "../../../domain/repotisories/user-repository";
import { UserInMemoryRepository } from "../../../infra/repositories/in-memory/user-in-memory-repository";
import { SignUpUseCase } from "./sign-up-usecase";

describe('SignUpUsecase', () => {
  let userRepository: UserRepository;
  let signUpUseCase: SignUpUseCase;

  beforeEach(() => {
    userRepository = new UserInMemoryRepository();
    signUpUseCase = new SignUpUseCase(userRepository);
  });

  it("should save the student data", async () => {
    // Arrange
    const student = {
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    };

    // Act
    await signUpUseCase.execute(student);

    // Assert
    const savedStudent = await userRepository.findByEmail(student.email);
    expect(savedStudent).toMatchObject(student);
    expect(savedStudent?.id).toBeDefined();
    expect(savedStudent?.ra).toBeDefined();
    expect(savedStudent?.ra).toMatch(/2023\d{6}/);
    expect(savedStudent?.createdAt).toBeDefined();
    expect(savedStudent?.updatedAt).toBeDefined();
    expect(savedStudent?.courses).toBeDefined();
    expect(savedStudent?.courses).toHaveLength(0);
  })

  it("should throw an error if the user already exists", async () => {
    // Arrange
    const student = {
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    };

    // Act
    await signUpUseCase.execute(student);

    // Assert
    await expect(signUpUseCase.execute(student)).rejects.toThrowError("User already exists");
  });
});