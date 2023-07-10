import { SubjectProps } from "../../domain/entities/subjects/subject-entity";

export type SubjectDTO = SubjectProps;
export type CreateSubjectDTO = Omit<SubjectProps, "id" | "createdAt" | "updatedAt" | "subjects">;
export type UpdateSubjectDTO = Partial<Omit<SubjectProps, "id" | "createdAt" | "updatedAt" | "subjects">>;