import { StudentDTO } from "../../../app/dtos/student-dto";
import { UserRepository } from "../../../domain/repotisories/user-repository";

export class UserInMemoryRepository implements UserRepository {

  constructor(private readonly users: StudentDTO[] = []) {}

  async findByEmail(email: string): Promise<StudentDTO | undefined> {
    return this.users.find((user) => user.email === email);
  }
  async create(user: StudentDTO): Promise<void> {
    this.users.push(user);
  }
  async save(user: StudentDTO): Promise<void> {
    const userIndex = this.users.findIndex((u) => u.email === user.email);
    this.users[userIndex] = user;
  }

}