import { CourseDTO } from "../../../app/dtos/course-dto";
import { CourseRepository } from "../../../domain/repotisories/course-repository";

export class CourseInMemoryRepository implements CourseRepository {
	private courses: CourseDTO[] = [];

	async findByName(name: string): Promise<CourseDTO | null> {
		const course = this.courses.find((course) => course.name === name);
		return course || null;
	}
	async findById(id: string): Promise<CourseDTO | null> {
		const course = this.courses.find((course) => course.id === id);
		return course || null;
	}
	async create(course: CourseDTO): Promise<void> {
		this.courses.push(course);
	}
	async save(course: CourseDTO): Promise<void> {
		const courseIndex = this.courses.findIndex((u) => u.id === course.id);
		this.courses[courseIndex] = course;
	}
}