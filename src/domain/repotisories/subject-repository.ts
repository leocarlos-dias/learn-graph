import { SubjectProps } from "../entities/subjects/subject-entity";

export interface SubjectRepository {
  findByName(name: string): Promise<SubjectProps | undefined>;
  findById(id: string): Promise<SubjectProps | undefined>;
  create(subject: SubjectProps): Promise<void>;
  save(subject: SubjectProps): Promise<void>;
}