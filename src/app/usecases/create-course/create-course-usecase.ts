import { Course } from "../../../domain/entities/courses/course-entity";
import { CourseRepository } from "../../../domain/repotisories/course-repository";
import { CreateCourseDTO } from "../../dtos/course-dto";

export class CreateCourseUseCase {
	constructor(private readonly courseRepository: CourseRepository) { }

	async execute(data: CreateCourseDTO): Promise<void> {
		const courseAlreadyExists = await this.courseRepository.findByName(data.name);
		if (courseAlreadyExists) {
			throw new Error("Course already exists");
		}
		const course = Course.create(data);
		await this.courseRepository.create(course);
	}
}