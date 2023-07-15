import { describe, it, expect, beforeEach } from "@jest/globals";

import { Course } from "../../../domain/entities/courses/course-entity";
import { CourseRepository } from "../../../domain/repotisories/course-repository";
import { SubjectRepository } from "../../../domain/repotisories/subject-repository";
import { CourseInMemoryRepository } from "../../../infra/repositories/in-memory/course-in-memory-repository";
import { SubjectInMemoryRepository } from "../../../infra/repositories/in-memory/subject-in-memory-repository";
import { AddSubjectUseCase } from "./add-subject-usecase";

describe("add subject usecase", () => {
	let courseRepository: CourseRepository;
	let subjectRepository: SubjectRepository;
	let addSubjectUseCase: AddSubjectUseCase;

	beforeEach(() => {
		courseRepository = new CourseInMemoryRepository();
		subjectRepository = new SubjectInMemoryRepository();
		addSubjectUseCase = new AddSubjectUseCase(courseRepository, subjectRepository);
	});

	it("should add subject to course", async () => {
		// Arrange
		const course = {
			name: "Course 1",
			description: "Description 1",
		};
		const subject = {
			name: "Subject 1",
			workLoad: 60,
		};

		await courseRepository.create(Course.create(course));
		const savedCourse = await courseRepository.findByName(course.name);

		// Act
		await addSubjectUseCase.execute({ courseId: savedCourse!.id, subject: subject });

		// Assert
		expect(savedCourse?.subjects).toHaveLength(1);
		expect(savedCourse?.subjects[0]).toMatchObject(subject);
		expect(savedCourse?.subjects[0].id).toBeDefined();
		expect(savedCourse?.subjects[0].createdAt).toBeDefined();
		expect(savedCourse?.subjects[0].updatedAt).toBeDefined();
	});

	it("should not add subject to course if course does not exists", async () => {
		// Arrange
		const courseId = "123";
		const subject = {
			name: "Subject 1",
			workLoad: 60,
		};

		// Act & Assert
		await expect(addSubjectUseCase.execute({ courseId: courseId, subject: subject })).rejects.toThrow("Course does not exists");
	});

	it("should not add subject to course if subject already exists in course", async () => {
		// Arrange
		const course = {
			name: "Course 1",
			description: "Description 1",
		};
		const subject = {
			name: "Subject 1",
			workLoad: 60,
		};

		await courseRepository.create(Course.create(course));
		const savedCourse = await courseRepository.findByName(course.name);
		addSubjectUseCase.execute({ courseId: savedCourse!.id, subject: subject });

		// Act & Assert
		await expect(addSubjectUseCase.execute({ courseId: savedCourse!.id, subject: subject })).rejects.toThrow("Subject already exists");
	});

	it("should possible add subject to course if subject already exists in another course", async () => {
		// Arrange
		const course1 = {
			name: "Course 1",
			description: "Description 1",
		};
		const course2 = {
			name: "Course 2",
			description: "Description 2",
		};
		const subject = {
			name: "Subject 1",
			workLoad: 60,
		};

		await courseRepository.create(Course.create(course1));
		await courseRepository.create(Course.create(course2));
		const savedCourse1 = await courseRepository.findByName(course1.name);
		const savedCourse2 = await courseRepository.findByName(course2.name);
		await addSubjectUseCase.execute({ courseId: savedCourse1!.id, subject: subject });

		// Act
		await addSubjectUseCase.execute({ courseId: savedCourse2!.id, subject: subject });

		// Assert
		expect(savedCourse1?.subjects).toHaveLength(1);
		expect(savedCourse2?.subjects).toHaveLength(1);
		expect(savedCourse1?.subjects[0]).toMatchObject(subject);
		expect(savedCourse2?.subjects[0]).toMatchObject(subject);
		expect(savedCourse1?.subjects[0].id).toBeDefined();
		expect(savedCourse1?.subjects[0].createdAt).toBeDefined();
		expect(savedCourse1?.subjects[0].updatedAt).toBeDefined();
		expect(savedCourse2?.subjects[0].id).toBeDefined();
		expect(savedCourse2?.subjects[0].createdAt).toBeDefined();
		expect(savedCourse2?.subjects[0].updatedAt).toBeDefined();
	});

});