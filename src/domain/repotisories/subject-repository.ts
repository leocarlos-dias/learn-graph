import { SubjectDTO } from "../../app/dtos/subject-dto";
import { SubjectProps } from "../entities/subjects/subject-entity";

export interface SubjectRepository {
  findByName(name: string): Promise<SubjectDTO | null>;
  findById(id: string): Promise<SubjectDTO | null>;
  create(subject: SubjectProps): Promise<void>;
  save(subject: SubjectProps): Promise<void>;
}