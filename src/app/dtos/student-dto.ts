import { StudentProps } from "../../domain/entities/students/student-entity";
import { CourseDTO } from "./course-dto";

export type StudentDTO = Omit<StudentProps, "courses"> & { courses: CourseDTO[] };
export type SignUpStudentDTO = Pick<StudentProps, "email" | "password" | "name">;
export type SignInStudentDTO = Pick<StudentProps, "email" | "password">;
export type UpdateStudentDTO = Partial<Omit<StudentProps, "id" | "ra" | "courses" | "createdAt" | "updatedAt">>;