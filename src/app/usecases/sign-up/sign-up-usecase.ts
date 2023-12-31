import { Student } from "../../../domain/entities/students/student-entity";
import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { SignUpStudentDTO, StudentDTO } from "../../dtos/student-dto";

export class SignUpUseCase {
	constructor(private readonly studentRepository: StudentRepository) { }
	async execute(data: SignUpStudentDTO): Promise<StudentDTO> {
		if (!data.email || !data.name || !data.password) {
			throw new Error("Invalid data");
		}
		const studentAlreadyExists = await this.studentRepository.findByEmail(data.email);
		if (studentAlreadyExists) {
			throw new Error("Student already exists");
		}
		const student = Student.create(data);
		await this.studentRepository.create(student);
		return student.toObject();
	}
}

