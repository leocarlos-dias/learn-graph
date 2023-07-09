import { StudentProps } from "../../domain/entities/students/student-entity";

export type StudentDTO = StudentProps;
export type CreateStudentDTO = Omit<StudentProps, "id" | "ra" | "courses" | "createdAt" | "updatedAt">;
export type UpdateStudentDTO = Partial<Omit<StudentProps, "id" | "ra" | "courses" | "createdAt" | "updatedAt">>