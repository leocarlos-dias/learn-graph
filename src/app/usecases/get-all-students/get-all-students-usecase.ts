import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { StudentDTO } from "../../dtos/student-dto";

export class GetAllStudentsUseCase {
	constructor(private readonly studentRepository: StudentRepository) { }

	async execute(): Promise<StudentDTO[]> {
		return await this.studentRepository.findAll();
	}
}