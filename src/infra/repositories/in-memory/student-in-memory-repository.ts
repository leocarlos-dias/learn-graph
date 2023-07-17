import { StudentDTO } from "../../../app/dtos/student-dto";
import { StudentRepository } from "../../../domain/repotisories/student-repository";

export class StudentInMemoryRepository implements StudentRepository {
	private students: StudentDTO[] = [];

	async findByEmail(email: string): Promise<StudentDTO | null> {
		const student = this.students.find((student) => student.email === email);
		return student || null;
	}
	async findById(id: string): Promise<StudentDTO | null> {
		const student = this.students.find((student) => student.id === id);
		return student || null;
	}
	async create(student: StudentDTO): Promise<void> {
		this.students.push(student);
		console.log(this.students);
	}
	async save(student: StudentDTO): Promise<void> {
		const studentIndex = this.students.findIndex((u) => u.email === student.email);
		this.students[studentIndex] = student;
	}
}