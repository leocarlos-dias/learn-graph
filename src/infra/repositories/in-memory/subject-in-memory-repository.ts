import { SubjectDTO } from "../../../app/dtos/subject-dto";
import { SubjectRepository } from "../../../domain/repotisories/subject-repository";

export class SubjectInMemoryRepository implements SubjectRepository {
	private subjects: SubjectDTO[] = [];

	async findByName(name: string): Promise<SubjectDTO | null> {
		const subject = this.subjects.find((subject) => subject.name === name);
		return subject || null;
	}
	async findById(id: string): Promise<SubjectDTO | null> {
		const subject = this.subjects.find((subject) => subject.id === id);
		return subject || null;
	}
	async create(subject: SubjectDTO): Promise<void> {
		this.subjects.push(subject);
	}
	async save(subject: SubjectDTO): Promise<void> {
		const subjectIndex = this.subjects.findIndex((u) => u.id === subject.id);
		this.subjects[subjectIndex] = subject;
	}
}