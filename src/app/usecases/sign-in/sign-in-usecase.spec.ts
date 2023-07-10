import { Student } from "../../../domain/entities/students/student-entity";
import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { StudentInMemoryRepository } from "../../../infra/repositories/in-memory/student-in-memory-repository";
import { JwtService } from "../../../infra/security/jwt-service";
import { SignInUseCase } from "./sign-in-usecase";

describe("Sign In UseCase", () => {
  let signInUseCase: SignInUseCase;
  let studentRepository: StudentRepository;
  let jwtService: JwtService;

  beforeEach(() => {
    studentRepository = new StudentInMemoryRepository();
    jwtService = new JwtService();
    signInUseCase = new SignInUseCase(studentRepository, jwtService);
  });

  it("should be able to sign in", async () => {
    // Arrange
    const student = {
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    };
    const studentSignIn = {
      email: student.email,
      password: student.password,
    };

    await studentRepository.create(Student.create(student));

    // Act
    const token = await signInUseCase.execute(studentSignIn);

    // Assert
    expect(token).toHaveProperty("token");
    expect(token.token).not.toBeNull();
    expect(token.token).not.toBeUndefined();
    expect(token.token).not.toBe("");
  });

  it("should not be able to sign in with invalid email", async () => {
    // Arrange
    const student = {
      name: "John Doe",
      email: "jonhdoe@example.com",
      password: "123456",
    };
    const studentSignIn = {
      email: "invalidemail@example.com",
      password: student.password,
    };

    await studentRepository.create(Student.create(student));

    // Act & Assert
    await expect(signInUseCase.execute(studentSignIn)).rejects.toThrowError("Wrong credentials");
  });

  it("should not be able to sign in with invalid password", async () => {
       // Arrange
       const student = {
        name: "John Doe",
        email: "jonhdoe@example.com",
        password: "123456",
      };
      const studentSignIn = {
        email: student.email,
        password: "invalidpassword",
      };
  
      await studentRepository.create(Student.create(student));
  
      // Act & Assert
      await expect(signInUseCase.execute(studentSignIn)).rejects.toThrowError("Wrong credentials");
   });
});