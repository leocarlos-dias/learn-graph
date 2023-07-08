import { Student } from "../../../domain/entities/users/student-entity";
import { UserRepository } from "../../../domain/repotisories/user-repository";
import { CreateStudentDTO } from "../../dtos/student-dto";

export class SignUpUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(data: CreateStudentDTO): Promise<void> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);
    if (userAlreadyExists) {
      throw new Error("User already exists");
    }
    const user = Student.create(data);
    await this.userRepository.save(user);
  }
}

