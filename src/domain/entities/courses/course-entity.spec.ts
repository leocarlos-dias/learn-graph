import { describe, it, expect } from "@jest/globals";

import { Subject } from "../subjects/subject-entity";
import { Course } from "./course-entity";

describe("Course Entity", () => {

	it("should create a course", () => {
		// Arrange
		const course = {
			name: "Course 1",
			description: "Description 1",
		};

		// Act
		const courseEntity = Course.create(course);

		// Assert
		expect(courseEntity).toBeInstanceOf(Course);
		expect(courseEntity).toMatchObject(course);
		expect(courseEntity.createdAt).toBeInstanceOf(Date);
		expect(courseEntity.updatedAt).toBeInstanceOf(Date);
	});

	it("should update a course", () => {
		// Arrange
		const course = {
			name: "Course 1",
			description: "Description 1",
		};

		// Act
		const courseEntity = Course.create(course);
		courseEntity.update({ name: "Course 2" });

		// Assert
		expect(courseEntity).toBeInstanceOf(Course);
		expect(courseEntity).toMatchObject({
			...course,
			name: "Course 2",
		});
		expect(courseEntity.createdAt).toBeInstanceOf(Date);
		expect(courseEntity.updatedAt).toBeInstanceOf(Date);
	});

	it("should add subject to course", () => {
		// Arrange
		const course = {
			name: "Course 1",
			description: "Description 1",
		};

		const subject = {
			name: "Subject 1",
			workLoad: 60,
		};

		const courseEntity = Course.create(course);
		const subjectEntity = Subject.create(subject);

		// Act
		courseEntity.addSubject(subjectEntity);

		// Assert
		expect(courseEntity.subjects).toHaveLength(1);
		expect(courseEntity.subjects[0]).toBeInstanceOf(Subject);
		expect(courseEntity.subjects[0]).toMatchObject(subject);
	});

	it("should not add subject to course if subject already exists", () => {
		// Arrange
		const course = {
			name: "Course 1",
			description: "Description 1",
		};

		const subject = {
			name: "Subject 1",
			workLoad: 60,
		};

		const courseEntity = Course.create(course);
		const subjectEntity = Subject.create(subject);
		courseEntity.addSubject(subjectEntity);

		// Act & Assert
		expect(() => courseEntity.addSubject(subjectEntity)).toThrowError("Subject already exists");
	});

	it("should remove subject from course", () => {
		// Arrange
		const course = {
			name: "Course 1",
			description: "Description 1",
		};

		const subject = {
			name: "Subject 1",
			workLoad: 60,
		};

		const courseEntity = Course.create(course);
		const subjectEntity = Subject.create(subject);

		// Act
		courseEntity.addSubject(subjectEntity);

		// Assert
		expect(courseEntity.subjects).toHaveLength(1);

		// Act
		courseEntity.removeSubject(subjectEntity);

		// Assert
		expect(courseEntity.subjects).toHaveLength(0);
	});

	it("should not remove subject from course if subject does not exists", () => {
		// Arrange
		const course = {
			name: "Course 1",
			description: "Description 1",
		};

		const subject = {
			name: "Subject 1",
			workLoad: 60,
		};

		const courseEntity = Course.create(course);
		const subjectEntity = Subject.create(subject);

		// Act & Assert
		expect(() => courseEntity.removeSubject(subjectEntity)).toThrowError("Subject does not exists");
	});
});