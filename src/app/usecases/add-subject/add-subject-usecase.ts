import { Course } from "../../../domain/entities/courses/course-entity";
import { Subject } from "../../../domain/entities/subjects/subject-entity";
import { CourseRepository } from "../../../domain/repotisories/course-repository";
import { SubjectRepository } from "../../../domain/repotisories/subject-repository";
import { CreateSubjectDTO } from "../../dtos/subject-dto";

export class AddSubjectUseCase {
	constructor(
		private readonly courseRepository: CourseRepository,
		private readonly subjectRepository: SubjectRepository
	) { }

	async execute(data: { courseId: string, subject: CreateSubjectDTO }): Promise<Course> {
		const courseAlreadyExists = await this.courseRepository.findById(data.courseId);
		if (!courseAlreadyExists) {
			throw new Error("Course does not exists");
		}
		const subjectAlreadyExistsInCourse = courseAlreadyExists.subjects.find(s => s.name === data.subject.name);
		if (subjectAlreadyExistsInCourse) {
			throw new Error("Subject already exists in course");
		}
		let subject: Subject;
		const subjectAlreadyExists = await this.subjectRepository.findByName(data.subject.name);
		if (subjectAlreadyExists) {
			subject = Subject.instance(subjectAlreadyExists);
		} else {
			subject = Subject.create(data.subject);
			await this.subjectRepository.create(subject);
		}

		const course = Course.instance(courseAlreadyExists);
		course.addSubject(subject);

		await this.courseRepository.save(course);
		return course;
	}
}