import { StudentDTO } from "../../app/dtos/student-dto";
import { StudentProps } from "../entities/students/student-entity";

export interface StudentRepository {
  findAll(): Promise<StudentDTO[]>;
  findByEmail(email: string): Promise<StudentDTO | null>;
  findById(id: string): Promise<StudentDTO | null>;
  create(student: StudentProps): Promise<void>;
  save(student: StudentProps): Promise<void>;
}