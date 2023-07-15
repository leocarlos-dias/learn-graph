import { CourseProps } from "../entities/courses/course-entity";

export interface CourseRepository {
  findByName(name: string): Promise<CourseProps | undefined>;
  findById(id: string): Promise<CourseProps | undefined>;
  create(course: CourseProps): Promise<void>;
  save(course: CourseProps): Promise<void>;
}