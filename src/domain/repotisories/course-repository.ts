import { CourseDTO } from "../../app/dtos/course-dto";
import { CourseProps } from "../entities/courses/course-entity";

export interface CourseRepository {
  findByName(name: string): Promise<CourseDTO | null>;
  findById(id: string): Promise<CourseDTO | null>;
  create(course: CourseProps): Promise<void>;
  save(course: CourseProps): Promise<void>;
}