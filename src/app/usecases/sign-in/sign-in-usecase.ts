import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { JwtService } from "../../../infra/security/jwt-service";
import { SignInStudentDTO } from "../../dtos/student-dto";

export class SignInUseCase {
	constructor(private readonly studentRepository: StudentRepository, private readonly jwtService: JwtService) { }

	async execute(data: SignInStudentDTO): Promise<{ token: string }> {
		const student = await this.studentRepository.findByEmail(data.email);
		if (!student) {
			throw new Error("Wrong credentials");
		}
		if (student.password !== data.password) {
			throw new Error("Wrong credentials");
		}
		const token = this.jwtService.sign({ id: student.id }, { expiresIn: "1d" });
		return { token };
	}
}