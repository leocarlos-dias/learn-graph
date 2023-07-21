import { describe, it, expect, beforeEach } from "@jest/globals";
import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { GetAllStudentsUseCase } from "./get-all-students-usecase";
import { StudentInMemoryRepository } from "../../../infra/repositories/in-memory/student-in-memory-repository";
import { Student } from "../../../domain/entities/students/student-entity";

describe("GetAllStudentsUsecase", () => {
	let studentRepository: StudentRepository;
	let getAllStudentsUseCase: GetAllStudentsUseCase;

	beforeEach(() => {
		studentRepository = new StudentInMemoryRepository();
		getAllStudentsUseCase = new GetAllStudentsUseCase(studentRepository);
	});

	it("should return all students", async () => {
		// Arrange
		const student1 = {
			name: "John Doe",
			email: "jonhdoe@example.com",
			password: "123456",
		};
		const student2 = {
			name: "Mary Jane",
			email: "maryjane@example.com",
			password: "123456",
		};

		await studentRepository.create(Student.create(student1));
		await studentRepository.create(Student.create(student2));

		// Act
		const students = await getAllStudentsUseCase.execute();

		// Assert
		expect(students).toHaveLength(2);
		expect(students[0]).toMatchObject(student1);
		expect(students[1]).toMatchObject(student2);
	});

	it("should return an empty array if there are no students", async () => {
		// Act
		const students = await getAllStudentsUseCase.execute();

		// Assert
		expect(students).toHaveLength(0);
	});

  
});


