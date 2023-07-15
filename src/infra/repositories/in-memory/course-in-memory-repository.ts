import { CourseDTO } from "../../../app/dtos/course-dto";
import { CourseRepository } from "../../../domain/repotisories/course-repository";

export class CourseInMemoryRepository implements CourseRepository {

	constructor(private readonly courses: CourseDTO[] = []) { }

	async findByName(name: string): Promise<CourseDTO | undefined> {
		return this.courses.find((course) => course.name === name);
	}
	async findById(id: string): Promise<CourseDTO | undefined> {
		return this.courses.find((course) => course.id === id);
	}
	async create(course: CourseDTO): Promise<void> {
		this.courses.push(course);
	}
	async save(course: CourseDTO): Promise<void> {
		const courseIndex = this.courses.findIndex((u) => u.id === course.id);
		this.courses[courseIndex] = course;
	}
}