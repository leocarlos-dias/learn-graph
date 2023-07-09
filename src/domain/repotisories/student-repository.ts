import { StudentProps } from "../entities/students/student-entity";

export interface StudentRepository {
  findByEmail(email: string): Promise<StudentProps | undefined>;
  create(student: StudentProps): Promise<void>;
  save(student: StudentProps): Promise<void>;
}