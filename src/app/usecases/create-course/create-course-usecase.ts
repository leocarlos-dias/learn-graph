import { Course } from "../../../domain/entities/courses/course-entity";
import { CourseRepository } from "../../../domain/repotisories/course-repository";
import { CourseDTO, CreateCourseDTO } from "../../dtos/course-dto";

export class CreateCourseUseCase {
	constructor(private readonly courseRepository: CourseRepository) { }

	async execute(data: CreateCourseDTO): Promise<CourseDTO> {
		const courseAlreadyExists = await this.courseRepository.findByName(data.name);
		if (courseAlreadyExists) {
			throw new Error("Course already exists");
		}
		const course = Course.create(data);
		await this.courseRepository.create(course);
		return course.toObject();
	}
}