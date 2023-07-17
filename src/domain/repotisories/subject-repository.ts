import { SubjectProps } from "../entities/subjects/subject-entity";

export interface SubjectRepository {
  findByName(name: string): Promise<SubjectProps | null>;
  findById(id: string): Promise<SubjectProps | null>;
  create(subject: SubjectProps): Promise<void>;
  save(subject: SubjectProps): Promise<void>;
}