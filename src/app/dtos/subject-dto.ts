import { SubjectProps } from "../../domain/entities/subjects/subject-entity";

export type SubjectDTO = SubjectProps;
export type CreateSubjectDTO = Pick<SubjectProps, "name" | "workLoad">;
export type UpdateSubjectDTO = Partial<Pick<SubjectProps, "name" | "workLoad">>;