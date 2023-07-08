import { StudentProps } from "../entities/users/student-entity";

export interface UserRepository {
  findByEmail(email: string): Promise<StudentProps | undefined>;
  create(user: StudentProps): Promise<void>;
  save(user: StudentProps): Promise<void>;
}