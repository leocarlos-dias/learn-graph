import { CourseProps } from "../../domain/entities/courses/course-entity";

export type CourseDTO = CourseProps;
export type CreateCourseDTO = Omit<CourseProps, "id" | "createdAt" | "updatedAt" | "subjects">;
export type UpdateCourseDTO = Partial<Omit<CourseProps, "id" | "createdAt" | "updatedAt" | "subjects">>;