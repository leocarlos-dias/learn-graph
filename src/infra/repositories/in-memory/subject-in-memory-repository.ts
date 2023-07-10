import { SubjectDTO } from "../../../app/dtos/subject-dto";
import { SubjectRepository } from "../../../domain/repotisories/subject-repository";

export class SubjectInMemoryRepository implements SubjectRepository {

  constructor(private readonly subjects: SubjectDTO[] = []) {}

  async findByName(name: string): Promise<SubjectDTO | undefined> {
    return this.subjects.find((subject) => subject.name === name);
  }
  async findById(id: string): Promise<SubjectDTO | undefined> {
    return this.subjects.find((subject) => subject.id === id);
  }
  async create(subject: SubjectDTO): Promise<void> {
    this.subjects.push(subject);
  }
  async save(subject: SubjectDTO): Promise<void> {
    const subjectIndex = this.subjects.findIndex((u) => u.id === subject.id);
    this.subjects[subjectIndex] = subject;
  }
}