import { describe, it, expect, beforeEach } from "@jest/globals";

import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { StudentInMemoryRepository } from "../../../infra/repositories/in-memory/student-in-memory-repository";
import { SignUpUseCase } from "./sign-up-usecase";

describe("Sign Up Usecase", () => {
	let studentRepository: StudentRepository;
	let signUpUseCase: SignUpUseCase;

	beforeEach(() => {
		studentRepository = new StudentInMemoryRepository();
		signUpUseCase = new SignUpUseCase(studentRepository);
	});

	it("should create the student data", async () => {
		// Arrange
		const student = {
			name: "John Doe",
			email: "jonhdoe@example.com",
			password: "123456",
		};

		// Act
		await signUpUseCase.execute(student);

		// Assert
		const savedStudent = await studentRepository.findByEmail(student.email);
		expect(savedStudent).toMatchObject(student);
		expect(savedStudent?.id).toBeDefined();
		expect(savedStudent?.ra).toBeDefined();
		expect(savedStudent?.ra).toMatch(/2023\d{6}/);
		expect(savedStudent?.createdAt).toBeDefined();
		expect(savedStudent?.updatedAt).toBeDefined();
		expect(savedStudent?.courses).toBeDefined();
		expect(savedStudent?.courses).toHaveLength(0);
	});

	it("should throw an error if the student already exists", async () => {
		// Arrange
		const student = {
			name: "John Doe",
			email: "jonhdoe@example.com",
			password: "123456",
		};

		// Act
		await signUpUseCase.execute(student);

		// Assert
		await expect(signUpUseCase.execute(student)).rejects.toThrowError("Student already exists");
	});

	it("should throw an error if the student data is invalid", async () => {
		// Arrange
		const student = {
			name: "John Doe",
			email: "jonhdoe@example.com",
			password: "",
		};

		// Act & Assert
		await expect(signUpUseCase.execute(student)).rejects.toThrowError("Invalid data");
	});
});