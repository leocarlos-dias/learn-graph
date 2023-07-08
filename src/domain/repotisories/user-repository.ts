import { StudentProps } from "../entities/users/student-entity";

export interface UserRepository {
  findByEmail(email: string): Promise<StudentProps | undefined>;
  save(user: Omit<StudentProps, "id" | "ra" | "courses" |"createdAt" | "updatedAt">): Promise<void>;
}