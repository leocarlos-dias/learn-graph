import { CourseProps } from "../entities/courses/course-entity";

export interface CourseRepository {
  findByName(name: string): Promise<CourseProps | null>;
  findById(id: string): Promise<CourseProps | null>;
  create(course: CourseProps): Promise<void>;
  save(course: CourseProps): Promise<void>;
}