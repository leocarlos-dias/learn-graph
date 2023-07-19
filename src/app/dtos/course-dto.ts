import { CourseProps } from "../../domain/entities/courses/course-entity";
import { SubjectDTO } from "./subject-dto";

export type CourseDTO = Omit<CourseProps, "subjects"> & { subjects: SubjectDTO[] };
export type CreateCourseDTO = Pick<CourseProps, "name" | "description">;
export type UpdateCourseDTO = Partial<Pick<CourseProps, "name" | "description">>;