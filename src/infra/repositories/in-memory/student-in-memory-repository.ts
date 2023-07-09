import { StudentDTO } from "../../../app/dtos/student-dto";
import { StudentRepository } from "../../../domain/repotisories/student-repository";

export class StudentInMemoryRepository implements StudentRepository {

  constructor(private readonly students: StudentDTO[] = []) {}

  async findByEmail(email: string): Promise<StudentDTO | undefined> {
    return this.students.find((student) => student.email === email);
  }
  async findById(id: string): Promise<StudentDTO | undefined> {
    return this.students.find((student) => student.id === id);
  }
  async create(student: StudentDTO): Promise<void> {
    this.students.push(student);
  }
  async save(student: StudentDTO): Promise<void> {
    const studentIndex = this.students.findIndex((u) => u.email === student.email);
    this.students[studentIndex] = student;
  }
}