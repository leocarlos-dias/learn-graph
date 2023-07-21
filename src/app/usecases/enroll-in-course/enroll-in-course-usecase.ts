import { Course } from "../../../domain/entities/courses/course-entity";
import { Student } from "../../../domain/entities/students/student-entity";
import { CourseRepository } from "../../../domain/repotisories/course-repository";
import { StudentRepository } from "../../../domain/repotisories/student-repository";
import { StudentDTO } from "../../dtos/student-dto";

export class EnrollInCourseUseCase {
	constructor(private readonly courseRepository: CourseRepository, private readonly studentRepository: StudentRepository) {
	}
	async execute(data: { courseId: string, studentId: string }): Promise<StudentDTO> {
		const courseAlreadyExists = await this.courseRepository.findById(data.courseId);
		if (!courseAlreadyExists) {
			throw new Error("Course does not exists");
		}
		const studentAlreadyExists = await this.studentRepository.findById(data.studentId);
		if (!studentAlreadyExists) {
			throw new Error("Student does not exists");
		}
		const studentAlreadyEnrolled = studentAlreadyExists.courses.find(course => course.id === courseAlreadyExists.id);
		if (studentAlreadyEnrolled) {
			throw new Error("Student is already enrolled in this course");
		}

		const course = Course.instance(courseAlreadyExists);
		const student = Student.instance(studentAlreadyExists);

		student.enrollInCourse(course);
		await this.studentRepository.save(student);
		return student.toObject();
	}
}